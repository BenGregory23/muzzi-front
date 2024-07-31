

export default function getImageURL(imagePath:string | null){
    if(!imagePath) return ""
    
    return "https://yshunxhjyoymmlekkczi.supabase.co/storage/v1/object/public/music_images/" + imagePath
}