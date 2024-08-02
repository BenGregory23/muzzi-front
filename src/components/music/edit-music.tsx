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

const FormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  youtubeLink: z.string().nonempty("Youtube link is required"),
  image: z.string().nonempty("Image is required"),
});

const EditMusic = ({
  music,
  buttonType,
}: {
  music: Music;
  buttonType: "button" | "icon";
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: music.title,
      youtubeLink: music.youtubeLink,
      image: music.image,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
        <SheetContent className="border-l-secondary text-white lg:max-w-3xl lg:w-50 overflow-y-auto">
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

              <FormField
                control={form.control}
                name="youtubeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
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
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditMusic;
