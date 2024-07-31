import { useMainStore } from "../stores/main.ts";

const playReactYoutube = () => {
    const { play } = useMainStore.getState();
    

    const player = document.getElementById("youtube") as HTMLIFrameElement;
    player.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
    );
    play()
};

const pauseReactYoutube = () => {
    const { pause } = useMainStore.getState();
    pause()
    const player = document.getElementById("youtube") as HTMLIFrameElement;
    player.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
    );
};


export default function usePlay(){
    return [playReactYoutube,pauseReactYoutube] as const;
}