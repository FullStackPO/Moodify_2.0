import React, { useState } from 'react'
import '../styles/form.css'
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import {useAuth} from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

  const navigate = useNavigate()

  const {loading, handleRegister} = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async(e) => {

    e.preventDefault()
    await handleRegister({username, email, password})
    navigate('/login')

  }

  return (
   <div>
        <form onSubmit={submitHandler}>
            <h1>Register</h1>

            <FormGroup 
            type="text" 
            label={"Username"} 
            placeholder={"Enter Username"} 
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            />

            <FormGroup 
            type="text" 
            label={"Email"} 
            placeholder={"Enter Email"} 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />

            <FormGroup 
            type="password" 
            label={"Password"} 
            placeholder={"Enter Password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />

            <button>Submit</button>
            <p>Already have account - <Link to='/login'>Login here</Link></p>
        </form>
    </div>
  )
}

export default Register
