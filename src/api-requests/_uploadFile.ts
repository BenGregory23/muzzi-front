import { keep } from "../hooks/keep.tsx";

export default async function _uploadFile(file: File, filename:string, folder:string | number, bucket:string) {
    try{
       
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', filename);
        formData.append('folder',  String(folder));
        const response = await fetch('http://localhost:3000/buckets/' + bucket, {
            method: 'POST',
            body: formData,
            headers:{
                "Authorization": "Bearer " + keep.get("token")
            }
        });
        const data = await response.json();
        return data.url;


    }catch(e){
        console.error(e);
    }

}