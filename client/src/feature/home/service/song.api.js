import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:3000/api/songs',
    withCredentials : true
})

export async function uploadSong({ url, posterUrl, title, mood }){

    const response = await api.post('/', { url, posterUrl, title, mood })

    return response.data

}

export async function getSong({ mood }){

    const response = await api.get('/?mood=' + mood)

    return response.data

}