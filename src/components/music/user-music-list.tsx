import { Music } from "../../types/index.ts";
import MusicHorizontal from "./music-horizontal";
import { motion } from "framer-motion";

const UserMusicList = ({ userMusicList }: { userMusicList: Music[] }) => {
  if (!userMusicList) {
    return <h1 className="text-white">No music found</h1>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1
      }
    }
  }
  

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex-col flex-grow   w-full h-full border-t border-secondary divide-y divide-secondary last:border-b  ">
      {userMusicList.map((music) => (
        <MusicHorizontal key={music.id} music={music} />
      ))}    
    </motion.div>
  );
};

export default UserMusicList;
