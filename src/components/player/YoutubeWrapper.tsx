import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import getIDfromURL from "../../utils/getIDFromURL.ts";
import { useMainStore } from "../../stores/main.ts";

const YoutubeWrapper = ({ videoId }) => {
    const  {isPlaying} = useMainStore((state) => state);
    const youtubePlayerRef = useRef(null);
    const [options, setOptions] = useState<YouTubeProps["opts"]>({
        height: "0",
        width: "0",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    });


    useEffect(() => {
        setOptions({
            height: "0",
            width: "0",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: isPlaying ? 1 : 0,
            },
        });
    }, [videoId]);

    const onPlayerReady = (event: any) => {
        event.target.playVideo();
    };
    

  return (
    <React.Fragment>
      <YouTube
        ref={youtubePlayerRef}
        className="hidden h-0 w-0"
        id={"youtube"}
        videoId={videoId}
        opts={options}
        onReady={onPlayerReady}
        onPlay={() => console.log("Playing")}
        onPause={() => console.log("Paused")}
      />
    </React.Fragment>
  );
};

export default YoutubeWrapper;
