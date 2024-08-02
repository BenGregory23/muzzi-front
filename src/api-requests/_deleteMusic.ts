import { fetchWrapper } from "../utils/fetchWrapper.ts";

export  default async function _deleteMusic(id: number) {
    try{
        const response = await fetchWrapper.delete('http://localhost:3000/musics/' + id);
        const data = await response.json();
        return data;
    }catch(e){
        console.error(e);
    }
}
