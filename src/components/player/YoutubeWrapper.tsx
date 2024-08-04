import React, { useEffect,useState, forwardRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useMainStore } from "../../stores/main.ts";


const YoutubeWrapper = forwardRef(({ videoId, onReady }:{videoId:string, onReady: ()=>any}, ref:any) => {
    const  {isPlaying} = useMainStore((state) => state);
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


    

  return (
    <React.Fragment>
      <YouTube
        ref={ref}
        className="hidden h-0 w-0"
        id={"youtube"}
        videoId={videoId}
        opts={options}
        onReady={onReady}
        onPlay={() => console.log("Playing")}
        onPause={() => console.log("Paused")}
      />
    </React.Fragment>
  );
});

export default YoutubeWrapper;
