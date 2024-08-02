import {useKeep } from "../hooks/useKeep.tsx";
import { fetchWrapper } from "../utils/fetchWrapper.ts"


export default async function getUserMusics() {
    try {

        const token = useKeep.get("token")
        if (!token) throw new Error("No token found")

        const response = await fetchWrapper.get("http://localhost:3000/users/me")

        return response
    } catch (e) {
        console.error(e)
        return e;
    }

}