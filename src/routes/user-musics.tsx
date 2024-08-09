import UserMusicList from "../components/music/user-music-list.tsx";
import { useMainStore } from "../stores/main.ts";
import MusicHorizontalHeader from "../components/music/music-horizontal-header.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

const UserMusics = () => {
  const { musics } = useMainStore((state) => state);

  if (musics.length > 0) {
    return (
      <ScrollArea className="text-white bg-background border-l h-full border-secondary">
        <MusicHorizontalHeader />
        <UserMusicList userMusicList={musics} />
      </ScrollArea>
    );
  }
};

export default UserMusics;
