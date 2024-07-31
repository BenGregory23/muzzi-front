import { EllipsisVertical, Pause, Play } from "lucide-react";
import { Music } from "../../types/music.ts";
import { useMainStore } from "../../stores/main.ts";
import { Button } from "../ui/button.tsx";
import usePlay from "../../hooks/usePlay.tsx";
import getImageURL from "../../utils/getImageURL.ts";
import _deleteMusic from "../../api-requests/_deleteMusic.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.tsx";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

const MusicHorizontal = ({ music }: { music: Music }) => {
  const { currentTrack, setCurrentTrack, isPlaying, removeMusic } =
    useMainStore((state) => state);
  const [playReactYoutube, pauseReactYoutube] = usePlay();

  function setMusicAsCurrentTrackAndPlay() {
    setCurrentTrack(music);
    playReactYoutube();
  }

  function deleteMusic(id: number) {
    removeMusic(id);
    _deleteMusic(id);
  }

  return (
    <div
      key={music.id}
      className="flex bg-background p-3 justify-between items-center space-x-10 space-y-2 overflow-hidden hover:bg-secondary/30 last:border-b border-secondary" 
    >
      <section className="flex justify-between items-center space-x-10 space-y-2 overflow-hidden">
        <div className="flex items-center justify-center min-w-20">
          {currentTrack && currentTrack.id == music.id && isPlaying ? (
            <Button
              variant={"ghost"}
              className="rounded-full h-14 w-14 bg-primary "
              onClick={() => pauseReactYoutube()}
            >
              <Pause
                className="w-5 h-5 text-white outline-white"
                fill="white"
              />
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              className="rounded-full border border-secondary w-12 h-12"
              onClick={() => setMusicAsCurrentTrackAndPlay()}
            >
              <Play className="w-4 h-4 text-white outline-white" fill="white" />
            </Button>
          )}
        </div>

        <div className="flex items-center  rounded-sm space-x-10">
          {music.image ? (
            <img
              src={getImageURL(music.image)}
              alt={music.title}
              className="w-20 h-20 rounded-sm object-cover"
            />
          ) : (
            <img src="https://placehold.co/80x80" alt={music.title} />
          )}
          <h1 className="text-white font-medium">{music.title}</h1>
        </div>
      </section>

      <div className="px-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"} className="flex justify-center bg-background items-center border border-secondary rounded-full h-12 w-12 focus:outline-none">
              <EllipsisVertical className="w-6 h-6 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background border border-secondary rounded-md">
            <DropdownMenuLabel>{music.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deleteMusic(music.id)}>
              <TrashIcon className="w-5 h-5 mr-2" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Pencil1Icon className="w-5 h-5 mr-2" />
              Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MusicHorizontal;
