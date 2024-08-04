import { Music } from "../../types/index.ts";
import MusicHorizontal from "./music-horizontal";

const UserMusicList = ({ userMusicList }: { userMusicList: Music[] }) => {
  if (!userMusicList) {
    return <h1 className="text-white">No music found</h1>;
  }

  return (
    <div className="flex-col flex-grow   w-full h-full border-t border-secondary divide-y divide-secondary last:border-b  ">
      {userMusicList.map((music) => (
        <MusicHorizontal key={music.id} music={music} />
      ))}

    
    </div>
  );
};

export default UserMusicList;
