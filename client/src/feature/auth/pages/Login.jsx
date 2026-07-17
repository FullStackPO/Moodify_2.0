import React from 'react'
import '../styles/form.css'

const Login = () => {
  return (
    <div>
        <form>
            <h1>Login</h1>

            <div>
            <label htmlFor="userid">Username or Email</label>
            <input 
            type="text" 
            name="userid" 
            id="userid" 
            placeholder="Enter User ID"
            required/>
            </div>

            <div>
            <label htmlFor="password">Password</label>
            <input 
            type="text" 
            name="password" 
            id="password" 
            placeholder="Enter password"
            required/>
            </div>

            <button>Submit</button>

        </form>
    </div>
  )
}

export default Login
