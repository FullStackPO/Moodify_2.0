import React from 'react'
import '../styles/form.css'
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'

const Login = () => {
  return (
    <div>
        <form>
            <h1>Login</h1>
            <FormGroup type={"text"} label={"User ID"} placeholder={"Username or Email"} />
            <FormGroup type={"password"} label={"Password"} placeholder={"Enter password"} />
            <button>Submit</button>
            <p>Don't have account ? <Link to='/register'>Register here</Link></p>
        </form>
    </div>
  )
}

export default Login
