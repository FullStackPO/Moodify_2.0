import React from 'react'
import './App.css'
import Expression from './feature/expression/components/Expression'
import { RouterProvider } from 'react-router'
import { router } from './App.route'
import { AuthProvider } from './feature/auth/Auth.context'
import { songProvider } from './feature/home/Song.context'

const App = () => {
  return (
    <AuthProvider>
      <songProvider>
        <RouterProvider router={router} />
      </songProvider>
    </AuthProvider>
  )
}

export default App