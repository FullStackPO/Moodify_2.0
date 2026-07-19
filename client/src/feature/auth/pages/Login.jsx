import React, {useState} from 'react'
import '../styles/form.css'
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

  const navigate = useNavigate()

  const {loading, handleLogin} = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async(e) => {
    e.preventDefault()
    await handleLogin({username, password})
    navigate('/')
  }

  return (
    <div>
        <form onSubmit={submitHandler}>
            <h1>Login</h1>

            <FormGroup 
            type="text" 
            label={"User ID"} 
            placeholder={"Username"} 
            value={username} 
            onChange={(e)=>{setUsername(e.target.value)}} 
            />

            <FormGroup 
            type="password" 
            label={"Password"} 
            placeholder={"Enter password"} 
            value={password} 
            onChange={(e)=>{setPassword(e.target.value)}} 
            />

            <button>Submit</button>
            <p>Don't have account ? <Link to='/register'>Register here</Link></p>
        </form>
    </div>
  )
}

export default Login
