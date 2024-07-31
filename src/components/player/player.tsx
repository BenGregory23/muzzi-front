import {
  Pause,
  Play,
  RotateCw,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Button } from "../ui/button.tsx";
import YouTube, { YouTubeProps } from "react-youtube";
import getIDfromURL from "../../utils/getIDFromURL.ts";
import { useMainStore } from "../../stores/main.ts";
import usePlay from "../../hooks/usePlay.tsx";
import getImageURL from "../../utils/getImageURL.ts";
import { useEffect, useState } from "react";
import { Slider } from "../ui/slider.tsx";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

const Player = () => {
  const { currentTrack, isPlaying, next, previous } = useMainStore(
    (state) => state
  );
  const [playReactYoutube, pauseReactYoutube] = usePlay();
  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration , setDuration] = useState(0);

  

   // Function to handle the `onReady` event
   const onPlayerReady = (event:any) => {
    setDuration(event.target.getDuration());
    setCurrentTime(event.target.getCurrentTime());
   
    // Set the player instance to state
    setPlayer(event.target);
  };

  // Function to set the volume
  const setVolume = (volume:number) => {
    console.log(player.getCurrentTime());

    if (player) {
      player.setVolume(volume); // Volume can be between 0 and 100
    }
  };


  const setCurrentTimeOnPlayer = (time: number) => {
    if (player) {
      player.seekTo(time, true);
    }
  };


  // update the current time using requestAnimationFrame to avoid performance issues
  const updateCurrentTime = () => {
    if (player) {
      setCurrentTime(player.getCurrentTime());
    }

    requestAnimationFrame(updateCurrentTime);
  };

  useEffect(() => {
    if (player) {
    
      updateCurrentTime();
    }
  }, [player]);





  const youtubePlayerOptions: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div className="flex p-4 text-white bg-background border-t border-secondary absolute bottom-0 w-full h-[6rem]  space-x-10">
      {/* Music Info */}
      <div className="flex space-x-3 items-center w-60">
        <div className="flex items-center justify-center w-16 h-16">
        {currentTrack != null && currentTrack.image != null ? (
          <img
            src={getImageURL(currentTrack!.image)}
            alt={currentTrack!.title}
            className="rounded-sm w-16 max-w-16 h-16 bg-slate-700 object-cover "
          />
        ) : (
          <div className="rounded-sm w-16 max-w-16 h-16 bg-slate-700 ">
            <span>{currentTrack?.title[0]}</span>
          </div>
        )}
        </div>

        <span className="text-base font-medium text-clip max-w-2/3">
          

          {
           currentTrack && currentTrack?.title.length > 20 ? (
              <span className="text-xs font-normal"> {currentTrack?.title}</span>
            ) : currentTrack?.title
          }
        </span>
      </div>
      {/* Controls and Timeline */}
      <div className="flex h-full   items-center space-x-4 px-2 flex-grow">
        <div className="flex h-full items-center space-x-1">
          <Button variant={"ghost"}>
            <Shuffle className="w-4 h-4" />
          </Button>

          <Button variant={"ghost"} onClick={() => previous()}>
            <SkipBack className="w-4 h-4" />
          </Button>

          {isPlaying ? (
            <Button
              variant={"ghost"}
              className="rounded-full h-12 w-12 bg-primary "
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
              onClick={() => playReactYoutube()}
            >
              <Play className="w-4 h-4 text-white outline-white" fill="white" />
            </Button>
          )}

          <Button variant={"ghost"} onClick={() => next()}>
            <SkipForward className="w-4 h-4" />
          </Button>

          <Button variant={"ghost"}>
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 flex-grow">
{/* 
          {
            currentTime ? (
              <span className="text-xs">{  Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(((currentTime/60)/60))}:{ Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format((currentTime/60) % 60) }:{ Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format((currentTime % 60))
              }</span>
            ) : (
              <span className="text-xs">0:0:0</span>
            )
          } */}
         
          <Slider className="w-full" step={1} defaultValue={[0]} min={0} max={duration} value={[currentTime]} onValueChange={(e) => setCurrentTimeOnPlayer(e.at(0) as number)} />
          {/* <span className="text-xs">{((duration/1000)/60).toFixed(4)}</span> */}
        </div>

        <div className="flex items-center space-x-4">

          <SpeakerLoudIcon className="w-4 h-4" />
          <Slider min={0} max={100} defaultValue={[100]}  className="w-20"  onValueChange={(e) => setVolume(e.at(0) as number)} />
        </div>
      </div>

      {currentTrack && currentTrack.youtubeLink && (
        <YouTube
          className="hidden h-0 w-0"
          id={"youtube"}
          videoId={getIDfromURL(currentTrack ? currentTrack.youtubeLink : "")}
          opts={youtubePlayerOptions}
          onReady={onPlayerReady}
        />
      )}
    </div>
  );
};

export default Player;
