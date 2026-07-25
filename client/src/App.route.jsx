import {createBrowserRouter} from 'react-router'
import Login from './feature/auth/pages/Login'
import Register from './feature/auth/pages/Register'
import Protected from './feature/auth/components/Protected'
import Home from './feature/home/pages/Home'

export const router = createBrowserRouter([
    {
        path : '/',
        element : <Protected><Home /></Protected>
    },
    {
        path : '/login',
        element : <Login />
    },
    {
        path : '/register',
        element : <Register />
    }
]) 