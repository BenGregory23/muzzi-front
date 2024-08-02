import { fetchWrapper } from "../utils/fetchWrapper.ts";

export  default async function _deleteMusic(id: number) {
    try{
        const {result, error} = await fetchWrapper.delete('http://localhost:3000/musics/' + id);
        if(error) throw new Error(error.message);
        else return result;
        
    }catch(e){
        console.error(e);
    }
}
