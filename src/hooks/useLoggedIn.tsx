import { useMainStore } from "../stores/main.ts";
import { useKeep } from "./useKeep.tsx";


export default function useLoggedIn() {
 
    const { token } = useMainStore((state) => state);
    const localToken = useKeep.get("token");
    
   if(token && localToken){
       return true;
   }
   else return false
}
