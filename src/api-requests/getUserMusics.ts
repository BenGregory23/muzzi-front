import {useKeep } from "../hooks/useKeep.tsx";
import { API_URL } from "../lib/constants.ts";
import { CustomError, UnauthorizedError } from "../lib/errors.ts";
import { fetchWrapper } from "../utils/fetchWrapper.ts"


export default async function getUserMusics(){
    try{
    
        const token = useKeep.get("token")
        if(!token) throw new UnauthorizedError("Unauthorized")

        const {result, error} = await fetchWrapper.get(API_URL + "/users/me/musics")
        if(error) throw new CustomError(error.message, error.statusCode)
        else return result;
    }catch(e){
        return e;
    }

}