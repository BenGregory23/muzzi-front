import { Music } from "./music";


export type User = {
    id     : number;
    createdAt : Date;
    updatedAt : Date;
  
    email    : string;
    firstname : string;
    lastname : string;
    musics : Music[] | null;
}   
  