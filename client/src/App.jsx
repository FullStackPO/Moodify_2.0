import React from 'react'
import './App.css'
import Expression from './feature/expression/components/Expression'
import { RouterProvider } from 'react-router'
import { router } from './App.route'
import { AuthProvider } from './feature/auth/Auth.context'
import { SongProvider } from './feature/home/Song.context'

const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </AuthProvider>
  )
}

export default App