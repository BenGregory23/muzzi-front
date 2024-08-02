import { fetchWrapper } from "../../utils/fetchWrapper.ts";




export default async function _searchVideo(keywords: string) {
    {
        try {
            const response = await fetchWrapper.get("http://localhost:3000/search-video?" +
                new URLSearchParams({ keywords: keywords })
            );


            return response;


        } catch (e) {
            console.log(e);
        }
    }

}