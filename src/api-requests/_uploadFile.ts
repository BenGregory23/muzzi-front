import {useKeep } from "../hooks/useKeep.tsx";
import { API_URL } from "../lib/constants.ts";

export default async function _uploadFile(file: File, filename:string, folder:string | number, bucket:string) {
    try{
       
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', filename);
        formData.append('folder',  String(folder));


        // Not using the Fetch Wrapper because of the formData
        const response = await fetch(API_URL+'/buckets/' + bucket, {
            method: 'POST',
            body: formData,
            headers:{
                "Authorization": "Bearer " + useKeep.get("token")
            }
        });
        return Promise.resolve(response);

    }catch(e){
        console.error(e);
    }

}