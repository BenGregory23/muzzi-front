import { isUrl } from "../lib/utils.ts"


export default function getImageURL(imagePath:string | null){
    
    if(!imagePath) return ""
    if(isUrl(imagePath)) return imagePath

    return "https://yshunxhjyoymmlekkczi.supabase.co/storage/v1/object/public/music_images/" + imagePath 
}