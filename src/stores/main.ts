import { create } from 'zustand'
import { User, Music } from '../types/index'
import { keep } from '../hooks/keep.tsx'


const defaultMusics = [
    {
        id: 1,
        title: 'Lofi Jazz',
        youtubeLink: 'https://www.youtube.com/watch?v=T-SU0bfyJfU',
        image: '0/default-cover.jpg',
    },
    {
        id: 2,
        title: 'Lofi Hip Hop',
        youtubeLink: 'https://www.youtube.com/watch?v=T-SU0bfyJfU',
        image: '0/default-cover.jpg',
    },
]




// State types
interface States {
    user: User | null
    setUser: (user: User) => void
    logout: () => void

    token: string | null
    setToken: (token: string) => void

    musics: Music[]
    setMusics: (musics: Music[]) => void
    addMusic: (music: Music) => void
    removeMusic: (id: number) => void
    updateMusic: (id: number, music: Music) => void

    currentTrack: Music | null
    isPlaying: boolean | null
    setCurrentTrack: (currentTrack: Music) => void
    play: () => void
    pause: () => void
    next: () => void
    previous: () => void
    shuffle: () => void

}


export const useMainStore = create<States>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    logout: () => {
        set({musics: defaultMusics as Music[]})
        set({ currentTrack: defaultMusics[0] as Music })
        set({ user: null })
        set({ token: null })
    },

    token: keep.get('token') || null,
    setToken: (token: string) => {
        keep.set('token', token)
        set({ token })
    },

    musics: defaultMusics as Music[],
    setMusics: (musics: Music[]) => set({ musics }),
    addMusic: (music: Music) => set((state: States) => ({ musics: [...state.musics, music] })),
    removeMusic: (id: number) => set((state: States) => ({ musics: state.musics.filter((music) => music.id !== id) })),
    updateMusic: (id: number, music: Music) => set((state: States) => ({ musics: state.musics.map((m) => m.id === id ? music : m) })),


    currentTrack: defaultMusics ? defaultMusics[0] as Music : null,
    isPlaying: null,
    setCurrentTrack: (currentTrack: Music) => set({ currentTrack }),
    play: () => set(() => ({ isPlaying: true })),
    pause: () => set(() => ({ isPlaying: false })),
    //next: () => set((state: States) => ({ currentTrack: state.musics[state.musics.indexOf(state.currentTrack) + 1] })),
    next: () => set((state: States) => {
         // @ts-expect-error -- TS doesn't know that the index will never be -1
        const index = state.musics.indexOf(state.currentTrack)
        if (index === state.musics.length - 1) {
            return { currentTrack: state.musics[0] }
        }
        return { currentTrack: state.musics[index + 1] }
    }),
    previous: () => set((state: States) => {
        // @ts-expect-error -- TS doesn't know that the index will never be -1
        const index = state.musics.indexOf(state.currentTrack)
        if (index === 0) {
            return { currentTrack: state.musics[state.musics.length - 1] }
        }
        return { currentTrack: state.musics[index - 1] }
    }),
    shuffle: () => set((state: States) => ({ currentTrack: state.musics[Math.floor(Math.random() * state.musics.length)] })),
}))




