"use client";

import { Outlet, useNavigate } from "react-router-dom";
import Player from "../components/player/player.tsx";
import Sidebar from "../components/sidebar/sidebar.tsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import getUserMusics from "../api-requests/getUserMusics.ts";
import { useMainStore } from "../stores/main.ts";
import { useEffect } from "react";
import { keep } from "../hooks/keep.tsx";
import getUser from "../api-requests/getUser.ts";

const Root = () => {
  // Create a client
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { setUser, setCurrentTrack, setMusics, token, setToken } = useMainStore((state) => state);

  async function fillStore() {
    // Get token from local storage
    const token = keep.get("token");
    if (token) {
      setToken(token);
      navigate("/");
    }
    // Get user from backend using token
    const userFetched = await getUser();
    setUser(userFetched);


    // Get musics from backend using
    const musics = await getUserMusics();

   // useMainStore.setState({ musics: musics , currentTrack: musics[0],user:userFetched});
    console.log(musics)
    if (musics) {
      setMusics(musics);
      setCurrentTrack(musics[0]);
    }
  }

  useEffect(() => {
  
    if(token){
      fillStore()
    }


    
  }, [token]);

  return (
    <div className="h-screen max-h-screen flex">
      <QueryClientProvider client={queryClient}>
        <Sidebar />
        <div className="flex-grow">
          <Outlet />
        </div>

        <Player />
      </QueryClientProvider>
    </div>
  );
};

export default Root;
