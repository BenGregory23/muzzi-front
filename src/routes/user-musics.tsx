'use client'

import { useQuery } from "@tanstack/react-query";

import UserMusicList from "../components/music/user-music-list.tsx";

import getUserMusics from "../api-requests/getUserMusics.ts";



const UserMusics = () => {





    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['user-musics'],
        queryFn: () => getUserMusics(),
    });


    if (isLoading) {
        return <div className="text-white bg-background border-l h-full border-secondary">Loading...</div>;
    }

    if (isError) {
        return <div className="text-white bg-background border-l h-full border-secondary">Error: {error.message}</div>;
    }
    if(data.length > 0){
        return (
            <div className="text-white bg-background border-l h-full border-secondary">
                <UserMusicList userMusicList={data} />
            </div>
        );
    }
   
}

export default UserMusics;