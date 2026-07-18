import React from 'react'
import '../styles/form.css'
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'

const Register = () => {
  return (
   <div>
        <form>
            <h1>Register</h1>
            <FormGroup type={"text"} label={"Username"} placeholder={"Enter Username"} />
            <FormGroup type={"text"} label={"Email"} placeholder={"Enter Email"} />
            <FormGroup type={"password"} label={"Password"} placeholder={"Enter Password"}/>
            <button>Submit</button>
            <p>Already have account - <Link to='/login'>Login here</Link></p>
        </form>
    </div>
  )
}

export default Register
