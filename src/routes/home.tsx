import { Link } from "react-router-dom";
import AddMusic from "../components/music/add-music.tsx";
import UserMusicList from "../components/music/user-music-list.tsx";
import { Button } from "../components/ui/button.tsx";
import { ScrollArea } from "../components/ui/scroll-area.tsx";

import { useMainStore } from "../stores/main.ts";
import { RocketIcon } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import useLoggedIn from "../hooks/useLoggedIn.tsx";

export default function Home() {
  const { musics } = useMainStore((state) => state);
  

  

  return (
    <main className="flex h-[calc(100vh-6rem)] flex-col items-center border-l border-secondary bg-background">
      <ScrollArea className="h-full w-full">
        <div className="relative lg:min-h-72 h-72 w-full overflow-hidden flex items-end justify-center p-6">
          <div className="flex items-center  space-x-2 h-fit w-full z-50">
          {
            useLoggedIn() ? <AddMusic /> : <div className="space-x-4">
              <Button asChild><Link to={"/auth/signup"}><RocketIcon className="w-4 h-4 mr-2"/>Create an account</Link></Button>

              <Button variant={"outline"} className="border-primary border-dashed text-white" asChild><Link to={"/learn-more"}><StarFilledIcon className="w-4 h-4 mr-2"/>Learn more</Link></Button>

              </div>
          }

        
            
          </div>

          <div className="z-50 space-y-2">
            <h1 className="scroll-m-20 text-4xl text-white font-extrabold tracking-tight lg:text-5xl z-50">
              Listen to your favorite youtube videos with ease
            </h1>
            <p className="text-xl text-muted-foreground">
              Add your favorite music to your library and listen to them anytime. 
            </p>
          </div>

          <img
            src="/glass.jpg"
            alt="wow"
            className="absolute object-cover left-0 top-0 w-full  z-0"
          />
        </div>

        {musics && musics.length > 0 ? (
          <UserMusicList userMusicList={musics} />
        ) : (
          "No music found"
        )}


      </ScrollArea>
    </main>
  );
}
