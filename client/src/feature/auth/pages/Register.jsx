import React from 'react'

const Register = () => {
  return (
   <div>
        <form>
            <h1>Register</h1>

            <div>
            <label htmlFor="username">Username</label>
            <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder="Enter Username"
            required/>
            </div>

            <div>
            <label htmlFor="email">Email</label>
            <input 
            type="text" 
            name="email" 
            id="email" 
            placeholder="Enter email"
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

export default Register
