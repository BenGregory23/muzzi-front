import { keep } from "../hooks/keep.tsx";

export  default async function _deleteMusic(id: number) {
    try{
        const response = await fetch('http://localhost:3000/musics/' + id, {
            method: 'DELETE',
            headers :{
                'Authorization': 'Bearer ' + keep.get('token')
            }
        });
        const data = await response.json();
        return data;
    }catch(e){
        console.error(e);
    }
}
