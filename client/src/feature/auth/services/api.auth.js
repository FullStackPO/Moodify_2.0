import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:3000/api/auth',
    withCredentials : true
})

export async function registerUser({username, email, password}){

    const response = await api.post('/register', {
        username, email, password
    })

    return response.data

}

export async function loginUser({username, email, password}){

    const response = await api.post('/login', {
        username, email, password
    })

    return response.data

}

export async function getMe(){
    
    const response = await api.get('get-me')

    return response.data

}

export async function logoutUser(){

    const response = await api.post('/logout')

    return response.data

}