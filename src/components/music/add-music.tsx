import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet.tsx";
import { Button } from "../ui/button.tsx";
// @ts-expect-error - no types for uuid
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";
import { useForm } from "react-hook-form";
import { useKeep } from "../../hooks/useKeep.tsx";
import _uploadFile from "../../api-requests/_uploadFile.ts";
import { useMainStore } from "../../stores/main.ts";
import { PlusIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx";
import SearchYoutube from "./search/search-youtube.tsx";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox.tsx";
import { Label } from "../ui/label.tsx";
import { toast } from "sonner";
import { fetchWrapper } from "../../utils/fetchWrapper.ts";
import { UnauthorizedError } from "../../lib/errors.ts";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string(),
  youtubeLink: z.string().url(),
  // can be null
  image_file: z.nullable(z.any()).optional(),
  //.instanceof(FileList).refine((file) => file?.length == 1, "File is required.")
  image_external_url: z.string().url().optional(),
});

const AddMusic = () => {
  const navigate = useNavigate();
  const { user, addMusic, purge } = useMainStore((state) => state);
  const [useDefaultTitle, setUseDefaultTitle] = useState(true);
  const [useDefaultCover, setUseDefaultCover] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("image_file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      throw new Error("User is null, please login");
    }
    console.log(values);
    const uuid = uuidv4();
    const musicData = {
      title: values.title,
      youtubeLink: values.youtubeLink,
      image: values.image_external_url
        ? values.image_external_url
        : user?.id + "/" + uuid,
      userId: user?.id,
    };

    try {
      const response = await fetchWrapper.post(
        "http://localhost:3000/musics",
        musicData
      );
      console.log(response);
      if (response.error?.statusCode == 401) {
        throw new UnauthorizedError("Unauthorized, please login");
      }

      // If the user has provided an external url, we don't need to upload the file for the image cover
      if (values.image_external_url && response.result) {
        addMusic(response.result);
        toast.success("Music added successfully");
        return;
      }

      // If the user has provided a file, we need to upload the file for the image cover
      const responseUpload = await _uploadFile(
        values.image_file[0],
        uuid,
        user?.id,
        "music_images"
      );

      // If the file could not be uploaded, we still add the music
      if (!responseUpload) {
        addMusic(response.result);
        toast.info("Music added successfully, but image could not be uploaded, please try again");
        return;
      }
      // File uploaded successfully, we add the music with the image path
      else if (responseUpload) {
        const { path } = await responseUpload.json();
        addMusic({ ...response.result, image: path });
        toast.success("Music added successfully");
      }
    } catch (e) {
      if(e instanceof UnauthorizedError){
        toast.error(e.message);
        purge();
        navigate("/auth/signin");
        return;
      }
      
      console.error(e);
    }
  }

  const handleSelect = (video: any) => {
    form.setValue(
      "youtubeLink",
      `https://www.youtube.com/watch?v=${video.id.videoId}`
    );
    form.setValue("title", video.snippet.title);

    if (useDefaultCover) {
      console.log("OUI")
      form.setValue("image_external_url", video.snippet.thumbnails.high.url);
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button className="space-x-2">
            <PlusIcon /> <span>Add Music</span>{" "}
          </Button>
        </SheetTrigger>
        {/* make the sheet larger */}
        <SheetContent className="border-l-secondary text-white lg:max-w-3xl lg:w-50 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add a new music</SheetTitle>
            <SheetDescription>
              Fill out the form below to add a youtube video that you want to
              listen to.
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="search" className="w-full my-2 ">
            <TabsList className="w-full">
              <TabsTrigger value="search" className="flex-grow">
                Search{" "}
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex-grow">
                Manual
              </TabsTrigger>
            </TabsList>
            <TabsContent value="search">
              <SearchYoutube handleSelect={handleSelect} />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 text-white mt-4"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className=" px-4 py-1 rounded-md space-x-4 flex   items-center">
                      <FormControl>
                        <Checkbox
                          id="useDefaultTitle"
                          checked={useDefaultTitle}
                          onCheckedChange={() =>
                            setUseDefaultTitle(!useDefaultTitle)
                          }
                        />
                      </FormControl>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="useDefaultTitle">
                          Use default title
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          This will use the title of the youtube video as the
                          music title.
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem
                          className={`${useDefaultTitle ? "hidden" : ""}`}
                        >
                          <FormLabel>Music title</FormLabel>
                          <FormControl>
                            <Input placeholder=" My music title" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be the name of the music.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className=" px-4 py-1 rounded-md space-x-4 flex row-start-2  items-center">
                      <FormControl>
                        <Checkbox
                          name="useDefaultCover"
                          checked={useDefaultCover}
                          onCheckedChange={() =>
                            setUseDefaultCover(!useDefaultCover)
                          }
                        />
                      </FormControl>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="useDefaultCover">
                          Use default cover
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          This will use the default cover as the music cover.
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="image_file"
                      render={() => (
                        <FormItem
                          className={` 
                        ${useDefaultCover ? "hidden" : "col-span-1"} row-start-2
                        `}
                        >
                          <FormLabel>Image cover</FormLabel>
                          <FormControl>
                            <Input type="file" {...fileRef} />
                          </FormControl>
                          <FormDescription>
                            Paste the youtube link here.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="manual" className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 text-white mt-4"
                >
                  <FormField
                    control={form.control}
                    name="youtubeLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Youtube link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://youtube.com/zeygd23jbd"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Paste the youtube link here.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Music title</FormLabel>
                        <FormControl>
                          <Input placeholder=" My music title" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be the name of the music.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image_file"
                    render={() => (
                      <FormItem className="">
                        <FormLabel>Image cover</FormLabel>
                        <FormControl>
                          <Input type="file" {...fileRef} />
                        </FormControl>
                        <FormDescription>
                          Paste the youtube link here.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddMusic;
