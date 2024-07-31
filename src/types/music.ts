import { User } from "./index.ts";


export type Music = {
    id : number;
    createdAt : Date;
    updatedAt : Date;
  
    index : number;
    title : string;
    youtubeLink : string;
    userId : number;
    user : User | null;
    image : string | null;
}