import { useContext, useEffect } from "react";
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
        setUser(data)
        setLoading(false)
    }

    async function handlegetME() {
    try {
        setLoading(true);

        const data = await getMe();
        console.log(data);

        setUser(data.user);
    } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);

        setUser(null);
    } finally {
        setLoading(false);
    }
    }

    async function handleLogout(){
        setLoading(true)
        const data = await logoutUser()
        setUser(data.user)
        setLoading(false)
    }

    useEffect(()=>{
        handlegetME()
    }, [])

    return ({ user, loading, handleRegister, handleLogin, handlegetME, handleLogout })

}