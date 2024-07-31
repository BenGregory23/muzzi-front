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
import { keep } from "../../hooks/keep.tsx";
import _uploadFile from "../../api-requests/_uploadFile.ts";
import { useMainStore } from "../../stores/main.ts";
import { PlusIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx";
import SearchYoutube from "./search/search-youtube.tsx";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox.tsx";
import { Label } from "../ui/label.tsx";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  youtubeLink: z.string().url(),
  image_file: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
});

const AddMusic = () => {
  const { user, addMusic } = useMainStore((state) => state);
  const [useDefaultTitle, setUseDefaultTitle] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("image_file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const uuid = uuidv4();
    if (!user) {
      throw new Error("User is null, please login");
    }

    console.log(`${user.id}/${uuid}`);

    const response = await fetch("http://localhost:3000/musics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + keep.get("token"),
      },
      body: JSON.stringify({
        title: values.title,
        youtubeLink: values.youtubeLink,
        image: user?.id + "/" + uuid,
        userId: user?.id,
      }),
    });

    _uploadFile(values.image_file[0], uuid, user?.id, "music_images");

    const data = await response.json();
    if (data) {
      addMusic(data);
    }
    console.log(data);
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button className="space-x-2">
            <PlusIcon /> <span>Add Music</span>{" "}
          </Button>
        </SheetTrigger>
        {/* make the sheet larger */}
        <SheetContent className="border-l-secondary text-white lg:max-w-3xl lg:w-50 ">
          <SheetHeader>
            <SheetTitle>Add a new music</SheetTitle>
            <SheetDescription>
              Fill out the form below to add a youtube video that you want to
              listen to.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 text-white mt-4"
            >
              <Tabs defaultValue="search" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="search" className="flex-grow">Search </TabsTrigger>
                  <TabsTrigger value="manual" className="flex-grow">Manual</TabsTrigger>
                </TabsList>
                <TabsContent value="search">
                  <SearchYoutube />
                </TabsContent>
                <TabsContent value="manual" className="w-full">
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
                </TabsContent>
              </Tabs>

              {!useDefaultTitle ? (
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
              ) : (
                <div>
                  <p>{/* TODO : implement the auto title feature */}</p>
                </div>
              )}

              <div className="border border-secondary p-4 rounded-md space-x-4 flex   items-start">
                
                <FormControl>
                  <Checkbox
                    checked={useDefaultTitle}
                    onCheckedChange={() => setUseDefaultTitle(!useDefaultTitle)}
                  />
                </FormControl>
                <div className="flex flex-col space-y-1">
                <Label htmlFor="useDefaultTitle">Use default title</Label>
                <p className="text-muted-foreground text-xs">
                  This will use the title of the youtube video as the music
                  title.
                </p>
                </div>
               
              </div>

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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddMusic;
