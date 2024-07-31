import { useMainStore } from "../stores/main.ts";


export default function useIsLoggedIn() {
 
    const { token } = useMainStore((state) => state);
    
   if(token){
       return true;
   }
}
