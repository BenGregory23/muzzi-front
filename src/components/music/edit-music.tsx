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
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs.tsx";
import { v4 as uuidv4 } from "uuid";
import _editMusic from "../../api-requests/_editMusic.ts";
import { useMainStore } from "../../stores/main.ts";
import _uploadFile from "../../api-requests/_uploadFile.ts";

const FormSchema = z.object({
  title: z.string().min(3),
  youtubeLink: z.string().url(),
  image_file: z.nullable(z.any()).optional(),
  image_external_url: z.string().url().optional(),
});

const EditMusic = ({
  music,
  buttonType,
}: {
  music: Music;
  buttonType: "button" | "icon";
}) => {
  const { user, updateMusic, purge } = useMainStore((state) => state);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: music.title,
      youtubeLink: music.youtubeLink,
      image_file: null,
      image_external_url: music.image!,
    },
  });

  const fileRef = form.register("image_file");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const uuid = uuidv4();
    const musicData = {
      ...music,
      title: data.title,
      youtubeLink: data.youtubeLink,
      image: data.image_external_url
        ? data.image_external_url
        : user?.id + "/" + uuid,
    };

    try {
      const result = await _editMusic(music.id, musicData);
      console.log(result);

      if (data.image_file) {
        _uploadFile(data.image_file, uuid, user!.id!, "music_images")
          .then(() => updateMusic(result.id, result))
          .catch((err) => {
            console.error(err);
            toast("Failed to upload image");
          });
      } else updateMusic(result.id, result);

      toast("Music updated successfully");
    } catch (e:any) {
      console.error(e);
      if(e.statusCode === 401){
        purge();
        toast("Session expired, please login again");
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
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

              <FormField
                control={form.control}
                name="youtubeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the title of the music.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Tabs>
                <TabsList defaultValue={"file"}>
                  <TabsTrigger value="url">Image link</TabsTrigger>
                  <TabsTrigger value="file">Image File</TabsTrigger>
                </TabsList>
                <TabsContent value="file">
                  <FormField
                    control={form.control}
                    name="image_file"
                    render={() => (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input type="file" {...fileRef} />
                        </FormControl>
                        <FormDescription>
                          This is the title of the music.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="url">
                  <FormField
                    control={form.control}
                    name="image_external_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={() =>
                              form.setValue("image_external_url", field.value)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          This is the title of the music.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <Button type="submit">Save</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditMusic;
