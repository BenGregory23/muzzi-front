import { API_URL } from "../../lib/constants.ts";
import { fetchWrapper } from "../../utils/fetchWrapper.ts";




export default async function _searchVideo(keywords: string) {
    {
        try {
            const {result, error} = await fetchWrapper.get(API_URL+"/search-video?" +
                new URLSearchParams({ keywords: keywords })
            );

            if (error) throw new Error(error.message);
            else return result;
        } catch (e) {
            console.log(e);
        }
    }

}