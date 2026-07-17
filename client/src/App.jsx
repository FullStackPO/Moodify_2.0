import React from 'react'
import './App.css'
import Expression from './feature/expression/components/Expression'
import { RouterProvider } from 'react-router'
import { router } from './App.route'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App