import { Pause, Play } from "lucide-react";
import { Pause, Play } from "lucide-react";
import { Music } from "../../types/music.ts";
import { useMainStore } from "../../stores/main.ts";
import { Button } from "../ui/button.tsx";
import usePlay from "../../hooks/usePlay.tsx";
import getImageURL from "../../utils/getImageURL.ts";
import _deleteMusic from "../../api-requests/_deleteMusic.ts";

import { TrashIcon } from "@radix-ui/react-icons";
import { DateTime } from "luxon";

import EditMusic from "./edit-music.tsx";
import useLoggedIn from "../../hooks/useLoggedIn.tsx";
import { Badge } from "../ui/badge.tsx";
import { shortenTitleToMaxLength } from "../../lib/utils.ts";
import { motion } from "framer-motion";

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

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      key={music.id}
      className="grid grid-cols-6 gap-1  bg-background p-3 justify-between items-center space-x-10 space-y-2 overflow-hidden hover:bg-secondary/30 last:border-b border-secondary"
    >
      <section className="col-span-1  flex items-center justify-start w-60  gap-6">
        <div className="mx-2 flex justify-center w-14">
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

        <div className="flex items-center w-24 h-24 overflow-hidden  rounded-sm space-x-10  ">
          {music.image ? (
            <img
              src={getImageURL(music.image)}
              alt={music.title}
              className="w-full h-full rounded-sm object-cover "
            />
          ) : (
            <img src="https://placehold.co/80x80" alt={music.title} />
          )}
        </div>
      </section>

      <h1 className="text-white font-medium">
        {shortenTitleToMaxLength(music.title)}
      </h1>
      <div className="flex items-center space-x-10">
        <h1 className=" font-light text-sm text-muted-foreground">
          {DateTime.fromISO(music.createdAt)
            .setLocale("fr")
            .toFormat("dd LLL yyyy ")}
        </h1>
      </div>

      <div className="flex items-center space-x-10">
        <h1 className=" font-light text-sm text-muted-foreground">
          {music.creator}
        </h1>
      </div>

      <div className="flex items-center space-x-10">
        {music.isLive ? <Badge>Live</Badge> : null}
      </div>

      {useLoggedIn() && (
        <div className={"px-4 flex-grow  flex justify-end space-x-4"}>
          <Button
            variant={"ghost"}
            className="text-muted-foreground border rounded-full h-10 p-0 border-secondary w-10"
            onClick={() => deleteMusic(music.id)}
          >
            <TrashIcon className="w-5 h-5 text-muted-foreground" />
          </Button>

          <EditMusic music={music} buttonType="icon" />
        </div>
      )}
    </motion.div>
  );
};

export default MusicHorizontal;
