// Fetch wrapper
import { useKeep } from "../hooks/useKeep.tsx";


export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};


async function get(url:string, useToken:boolean = true) {

    if(useToken && !useKeep.get("token")) {
        return Promise.reject("Token is required");
    }

    const requestOptions : any = {
        method: 'GET',
    };
    if(useToken) {
        requestOptions.headers = {
            ...requestOptions.headers,
            "Authorization": "Bearer " + useKeep.get("token") 
        }
    }

    return fetch(url, requestOptions).then(handleResponse);
}


async function post(url:string, body:any, useToken:boolean = true) {
    const requestOptions : any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    if(useToken) {
        requestOptions.headers = {
            ...requestOptions.headers,
            "Authorization": "Bearer " + useKeep.get("token") 
        }
    }
    return fetch(url, requestOptions).then(handleResponse);
}


async function put(url:string, body:any, useToken: boolean = true) {
    const requestOptions :any = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    if(useToken) {
        requestOptions.headers = {
            ...requestOptions.headers,
            "Authorization": "Bearer " + useKeep.get("token") 
        }
    }
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url:string,useToken: boolean = true) {
    const requestOptions : any = {
        method: 'DELETE'
    };
    if(useToken) {
        requestOptions.headers = {
            ...requestOptions.headers,
            "Authorization": "Bearer " + useKeep.get("token") 
        }
    }
    return fetch(url, requestOptions).then(handleResponse);
}


// return response data if response is ok
// else return response complete error

async function handleResponse(response :Response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            return Promise.reject(data);
        }
        return data;
    });
}




