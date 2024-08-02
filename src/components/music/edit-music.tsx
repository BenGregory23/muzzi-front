import { Pencil1Icon } from "@radix-ui/react-icons";


import { Music } from "../../types/index.ts";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet.tsx";
import { Button } from "../ui/button.tsx";

const EditMusic = ({ music, buttonType }: { music: Music, buttonType: "button" | "icon" }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
            {
                buttonType === "button" ? (
                    <Button className="space-x-2">
                    <Pencil1Icon /> <span>Edit</span>{" "}
                    </Button>
                ) : (
                    <Button variant={"ghost"} className="w-10 h-10 p-0 border border-secondary rounded-full">
                    <Pencil1Icon className="w-5 h-5 text-muted-foreground" /> 

                    </Button>
                )
            }
    
        </SheetTrigger>
        {/* make the sheet larger */}
        <SheetContent className="border-l-secondary text-white lg:max-w-3xl lg:w-50 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit music</SheetTitle>
            <SheetDescription>
              Fill out the form below to add a youtube video that you want to
              listen to.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditMusic;
