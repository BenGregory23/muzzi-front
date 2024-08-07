import { API_URL } from "../lib/constants.ts";
import { CustomError } from "../lib/errors.ts";
import { Music } from "../types/index.ts";
import { fetchWrapper } from "../utils/fetchWrapper.ts";

export  default async function _editMusic(id: number, music: Music) {
        const {result, error} = await fetchWrapper.put(API_URL+'/musics/' + id, music);
        if(error) throw new CustomError(error.message, error.statusCode)
        else return result;
}
