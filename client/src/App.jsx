import React from 'react'
import './App.css'
import Expression from './feature/expression/components/Expression'
import { RouterProvider } from 'react-router'
import { router } from './App.route'
import { AuthProvider } from './feature/auth/Auth.context'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App