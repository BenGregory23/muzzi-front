import { User } from "./index.ts";


export type Music = {
    id : number;
    createdAt : string;
    updatedAt : string;
  
    index : number;
    title : string;
    youtubeLink : string;
    userId : number;
    user : User | null;
    image : string | null;
}