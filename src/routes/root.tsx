import { Outlet, useNavigate } from "react-router-dom";
import Player from "../components/player/player.tsx";
import Sidebar from "../components/sidebar/sidebar.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import getUserMusics from "../api-requests/getUserMusics.ts";
import { useMainStore } from "../stores/main.ts";
import { useEffect } from "react";
import {useKeep } from "../hooks/useKeep.tsx";
import getUser from "../api-requests/getUser.ts";


const Root = () => {
  // Create a client
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { setUser, token, setToken, setMusics, setCurrentTrack, logout } = useMainStore(
    (state) => state
  );

  async function initializeStore() {
    try {
      // Get token from local storage
      const token = useKeep.get("token");

      // If found set token and navigate to home
      if (token) {
        setToken(token);
        navigate("/");
      }
      // If not found navigate to signin
      else{
        setToken(null);
        navigate("/auth/signin");
      }

      // Get user from backend using token
      const userFetched = await getUser();
      if(userFetched.statusCode === 401){
        setToken(null);
        navigate("/auth/signin");
        logout();
      }
      else setUser(userFetched);

      // Get musics from backend using
      const music = await getUserMusics();
      if(music.statusCode === 401){
        setToken(null);
        navigate("/auth/signin");
        logout()
      }
      setMusics(music)
      setCurrentTrack(music[0]);
     
    } catch (e:any) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (token) {
      initializeStore();
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
