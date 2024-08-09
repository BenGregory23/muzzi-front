import { useMainStore } from "../stores/main.ts";

const playReactYoutube = () => {
  const { play, currentTrack } = useMainStore.getState();
  console.log(currentTrack);
  play();
  const player = document.getElementById("youtube") as HTMLIFrameElement;
  player.contentWindow?.postMessage(
    '{"event":"command","func":"playVideo","args":""}',
    "*",
  );
};

const pauseReactYoutube = () => {
  const { pause } = useMainStore.getState();
  pause();
  const player = document.getElementById("youtube") as HTMLIFrameElement;
  player.contentWindow?.postMessage(
    '{"event":"command","func":"pauseVideo","args":""}',
    "*",
  );
};

export default function usePlay() {
  return [playReactYoutube, pauseReactYoutube] as const;
}
