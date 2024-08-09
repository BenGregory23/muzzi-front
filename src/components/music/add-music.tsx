import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet.tsx";
import { Button } from "../ui/button.tsx";
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
import _uploadFile from "../../api-requests/_uploadFile.ts";
import { useMainStore } from "../../stores/main.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx";
import SearchYoutube from "./search/search-youtube.tsx";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox.tsx";
import { Label } from "../ui/label.tsx";
import { toast } from "sonner";
import { fetchWrapper } from "../../utils/fetchWrapper.ts";
import { UnauthorizedError } from "../../lib/errors.ts";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../lib/constants.ts";
import i18next from "i18next";
import { MusicIcon } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  title: z.string(),
  youtubeLink: z.string().url(),
  // can be null
  image_file: z.nullable(z.any()).optional(),
  //.instanceof(FileList).refine((file) => file?.length == 1, "File is required.")
  image_external_url: z.string().url().optional(),
  creator: z.string().optional(),
  isLive: z.boolean().optional(),
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
      creator: values.creator,
      isLive: values.isLive,
    };

    try {
      const response = await fetchWrapper.post(API_URL + "/musics", musicData);
      console.log(response);
      if (response.error?.statusCode == 401) {
        throw new UnauthorizedError("Unauthorized, please login");
      }
      if (response.error?.statusCode == 403) {
        throw new Error(response.error.message);
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
        "music_images",
      );

      // If the file could not be uploaded, we still add the music
      if (!responseUpload) {
        addMusic(response.result);
        toast.info(
          "Music added successfully, but image could not be uploaded, please try again",
        );
        return;
      }
      // File uploaded successfully, we add the music with the image path
      else if (responseUpload) {
        const { path } = await responseUpload.json();
        addMusic({ ...response.result, image: path });
        toast.success("Music added successfully");
      }
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        toast.error(e.message);
        purge();
        navigate("/auth/signin");
        return;
      }

      if (e instanceof Error) {
        toast.error(e.message);
        return;
      }

      console.error(e);
    }
  }

  const handleSelect = (video: any) => {
    form.setValue(
      "youtubeLink",
      `https://www.youtube.com/watch?v=${video.id.videoId}`,
    );
    form.setValue("title", video.snippet.title);

    if (useDefaultCover) {
      console.log("OUI");
      form.setValue("image_external_url", video.snippet.thumbnails.medium.url);
    }

    // Add the creator if it exists
    if (video.snippet.channelTitle) {
      form.setValue("creator", video.snippet.channelTitle);
    }

    // Add the isLive if it exists
    if (video.snippet.liveBroadcastContent) {
      form.setValue("isLive", video.snippet.liveBroadcastContent == "live");
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Button className="space-x-2">
              <MusicIcon className="w-4 h-4" />{" "}
              <span>{i18next.t("addMusic.addMusic")}</span>{" "}
            </Button>
          </motion.button>
        </SheetTrigger>
        {/* make the sheet larger */}
        <SheetContent className="border-l-secondary text-white lg:max-w-3xl lg:w-50 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{i18next.t("addMusic.title")}</SheetTitle>
            <SheetDescription>
              {i18next.t("addMusic.subtitle")}
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="search" className="w-full my-2 ">
            <TabsList className="w-full">
              <TabsTrigger value="search" className="flex-grow">
                {i18next.t("addMusic.search")}{" "}
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex-grow">
                {i18next.t("addMusic.manual")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="search">
              <SearchYoutube handleSelect={handleSelect} />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10 text-white mt-4 flex flex-col justify-center"
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
                          {i18next.t("addMusic.useDefaultTitle")}
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          {i18next.t("addMusic.useDefaultTitleDescription")}
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
                          <FormLabel>
                            {i18next.t("addMusic.musicTitle")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              maxLength={40}
                              placeholder="Daft Punk -  Around the world..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {i18next.t("addMusic.musicTitleDescription")}
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
                          {i18next.t("addMusic.useDefaultCover")}
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          {i18next.t("addMusic.useDefaultCoverDescription")}
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
                          <FormLabel>
                            {i18next.t("addMusic.musicCover")}
                          </FormLabel>
                          <FormControl>
                            <Input type="file" {...fileRef} />
                          </FormControl>
                          <FormDescription>
                            {i18next.t("addMusic.musicCoverDescription")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    className="w-full max-w-prose self-center"
                    type="submit"
                  >
                    {i18next.t("addMusic.submit")}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="manual" className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10 text-white mt-4 flex flex-col justify-center"
                >
                  <FormField
                    control={form.control}
                    name="youtubeLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {i18next.t("addMusic.youtubeLink")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://youtube.com/zeygd23jbd"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {i18next.t("addMusic.youtubeLinkDescription")}
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
                        <FormLabel>
                          {i18next.t("addMusic.musicTitle")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Daft Punk - Around the world..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {i18next.t("addMusic.musicTitleDescription")}
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
                        <FormLabel>
                          {i18next.t("addMusic.musicCover")}
                        </FormLabel>
                        <FormControl>
                          <Input type="file" {...fileRef} />
                        </FormControl>
                        <FormDescription>
                          {i18next.t("addMusic.musicCoverDescription")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full max-w-prose self-center"
                    type="submit"
                  >
                    {i18next.t("addMusic.submit")}
                  </Button>
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
