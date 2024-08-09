import { create } from "zustand";
import { User, Music } from "../types/index";
import { useKeep } from "../hooks/useKeep.tsx";

const defaultMusics = [
  {
    id: 1,
    title: "Lofi Jazz",
    youtubeLink: "https://www.youtube.com/watch?v=T-SU0bfyJfU",
    createdAt: "2024-07-01",
    image: "0/default-cover.jpg",
    isLive: true,
  },
  {
    id: 2,
    title: "Chill Lofi",
    youtubeLink: "https://www.youtube.com/watch?v=CLeZyIID9Bo&t=2763s",
    createdAt: "2024-07-01",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCLeZyIID9Bo%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=d43824d733e5d1aa5284984ecb3405f4d0a4a45e72ae3a0155269e4c8107f3e5&ipo=images",
    creator: "Settle",
  },
];

// State types
interface States {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;

  token: string | null;
  setToken: (token: string | null) => void;

  purge: () => void;

  musics: Music[];
  setMusics: (musics: Music[]) => void;
  addMusic: (music: Music) => void;
  removeMusic: (id: number) => void;
  updateMusic: (id: number, music: Music) => void;

  currentTrack: Music | null;
  isPlaying: boolean | null;
  setCurrentTrack: (currentTrack: Music) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  shuffle: () => void;
}

export const useMainStore = create<States>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  logout: () => {
    useKeep.remove("token");

    set({ musics: defaultMusics as Music[] });
    set({ currentTrack: defaultMusics[0] as Music });
    set({ user: null });
    set({ token: null });
  },

  token: useKeep.get("token") || null,
  setToken: (token: string | null) => {
    if (token === null) useKeep.remove("token");
    else {
      useKeep.set("token", token);
      set({ token });
    }
  },

  purge: () => {
    useKeep.remove("token");
    set({ musics: defaultMusics as Music[] });
    set({ currentTrack: defaultMusics[0] as Music });
    set({ user: null });
    set({ token: null });
  },

  musics: defaultMusics as Music[],
  setMusics: (musics: Music[]) => set({ musics }),
  addMusic: (music: Music) =>
    set((state: States) => ({ musics: [...state.musics, music] })),
  removeMusic: (id: number) =>
    set((state: States) => ({
      musics: state.musics.filter((music) => music.id !== id),
    })),
  updateMusic: (id: number, music: Music) =>
    set((state: States) => ({
      musics: state.musics.map((m) => (m.id == id ? music : m)),
    })),

  currentTrack: defaultMusics[0] as Music,
  isPlaying: null,
  setCurrentTrack: (currentTrack: Music) => set({ currentTrack }),
  play: () => set(() => ({ isPlaying: true })),
  pause: () => set(() => ({ isPlaying: false })),
  next: () =>
    set((state: States) => ({
      // @ts-expect-error -- TS doesn't know that it will work
      currentTrack:
        state.musics[
          (state.musics.indexOf(state.currentTrack) + 1) % state.musics.length
        ],
    })),
  previous: () =>
    set((state: States) => {
      // @ts-expect-error -- TS doesn't know that the index will never be -1
      const index = state.musics.indexOf(state.currentTrack);
      if (index === 0) {
        return { currentTrack: state.musics[state.musics.length - 1] };
      }
      return { currentTrack: state.musics[index - 1] };
    }),
  shuffle: () =>
    set((state: States) => ({
      currentTrack:
        state.musics[Math.floor(Math.random() * state.musics.length)],
    })),
}));
