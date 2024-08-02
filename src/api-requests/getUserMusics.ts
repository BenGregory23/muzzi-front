import {useKeep } from "../hooks/useKeep.tsx";
import { CustomError } from "../lib/errors.ts";
import { fetchWrapper } from "../utils/fetchWrapper.ts"


export default async function getUserMusics(){
    try{
    
        const token = useKeep.get("token")
        if(!token) throw new Error("No token found")

        const {result, error} = await fetchWrapper.get("http://localhost:3000/users/me/musics")
        if(error) throw new CustomError(error.message, error.statusCode)
        else return result;
    }catch(e){
        console.error(e)
     
        return e;
    }

}