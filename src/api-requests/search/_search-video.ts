import { fetchWrapper } from "../../utils/fetchWrapper.ts";




export default async function _searchVideo(keywords: string) {
    {
        try {
            const {result, error} = await fetchWrapper.get("http://localhost:3000/search-video?" +
                new URLSearchParams({ keywords: keywords })
            );

            if (error) throw new Error(error.message);
            else return result;
        } catch (e) {
            console.log(e);
        }
    }

}