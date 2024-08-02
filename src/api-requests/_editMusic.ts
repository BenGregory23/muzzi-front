import { Music } from "../types/index.ts";
import { fetchWrapper } from "../utils/fetchWrapper.ts";

export  default async function _editMusic(id: number, music: Music) {
    try{
        const {result, error} = await fetchWrapper.put('http://localhost:3000/musics/' + id, music);
        if(error) throw new Error(error.message);
        else return result;
        
    }catch(e){
        console.error(e);
    }
}
