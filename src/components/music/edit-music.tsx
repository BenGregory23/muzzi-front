import { Pencil1Icon } from "@radix-ui/react-icons";

import { Music } from "../../types/index.ts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet.tsx";
import { Button } from "../ui/button.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";
import { UnauthorizedError } from "../../lib/errors.ts";
import _editMusic from "../../api-requests/_editMusic.ts";
import { useMainStore } from "../../stores/main.ts";
import _uploadFile from "../../api-requests/_uploadFile.ts";
import { isUrl } from "../../lib/utils.ts";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";

const FormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  youtubeLink: z.string().nonempty("Youtube link is required"),
  image: z.string().optional(),
  image_file: z.nullable(z.any()).optional(),
});

const EditMusic = ({
  music,
  buttonType,
}: {
  music: Music;
  buttonType: "button" | "icon";
}) => {
  const { user, updateMusic } = useMainStore((state) => state);
  const fileInputRef = useRef(null)
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: music.title,
      youtubeLink: music.youtubeLink,
      image: isUrl(music.image) ? music.image : "",
    },
  });

  const fileRef = form.register("image_file");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data)
      const uuid = uuidv4();

      const updatedMusic = {
        ...music,
        title: data.title,
      };

      const response = await _editMusic(music.id, updatedMusic);



      // If the user has provided an external url, we don't need to upload the file for the image cover
      if (isUrl(response.image) && response.result) {
        updateMusic(music.id, response);
        toast.success("Music updated successfully");
        return;
      }

      // If the user has provided a file, we need to upload the file for the image cover
      const responseUpload = await _uploadFile(
        data.image_file[0],
        uuid,
        user.id ? user.id  : null,
        "music_images"
      );
      // If the file could not be uploaded, we still add the music
      if (!responseUpload) {
        updateMusic(music.id, response);
        toast.info(
          "Music added successfully, but image could not be uploaded, please try again"
        );
        return;
      }
      // File uploaded successfully, we add the music with the image path
      else if (responseUpload) {
        const { path } = await responseUpload.json();
        updateMusic(music.id, { ...response, image: path });
        toast.success("Music added successfully");
      }
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        toast("Unauthorized, please login");
      }
    }
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {buttonType === "button" ? (
            <Button className="space-x-2">
              <Pencil1Icon /> <span>Edit</span>{" "}
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              className="w-10 h-10 p-0 border border-secondary rounded-full"
            >
              <Pencil1Icon className="w-5 h-5 text-muted-foreground" />
            </Button>
          )}
        </SheetTrigger>
        {/* make the sheet larger */}
        <SheetContent className="border-l-secondary text-white lg:max-w-xl  overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit music</SheetTitle>
            <SheetDescription>
              Fill out the form below to edit the music.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the title of the music.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center space-x-4 w-full ">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Paste the link to an image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <span className="text-muted-foreground text-sm">or</span>

                <FormField
                  control={form.control}
                  name="image_file"
                  render={() => (
                    <FormItem className="flex-grow  ">
                      <FormLabel>Image cover</FormLabel>
                      <FormControl>
                       
                          <Input type="file" {...fileRef} className="" id="file_button"  />
                         
                      </FormControl>
                      <FormDescription>
                        Upload an image from your computer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Save</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditMusic;
