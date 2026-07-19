import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { loginUser, registerUser, getMe, logoutUser } from "../services/api.auth";


export const useAuth = () =>{

    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context 

    async function handleRegister({username, email, password}){
        setLoading(true)
        const data = await registerUser({username, email, password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({username, email, password}){
        setLoading(true)
        const data = await loginUser({username, email, password})
        setUser(data.user)
        setLoading(false)
    }

    async function handlegetME(){
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogout(){
        setLoading(true)
        const data = await logoutUser()
        setUser(data.user)
        setLoading(false)
    }

    return ({ user, loading, handleRegister, handleLogin, handlegetME, handleLogout })

}