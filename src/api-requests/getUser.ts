import { keep } from "../hooks/keep.tsx"


export default async function getUserMusics(){
    try{
    
        const token = keep.get("token")
        if(!token) throw new Error("No token found")

        const response = await fetch("http://localhost:3000/users/me", {
            headers:{
                authorization: "Bearer " + keep.get("token")
            }
        })

      
        const data = await response.json()

        return data
    }catch(e){
        console.error(e)
        return e;
    }

}