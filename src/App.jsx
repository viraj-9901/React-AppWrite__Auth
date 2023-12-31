// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import Signup from './pages/Signup'
import {Outlet} from 'react-router-dom'

function App() {

  return (
   <>
      <h1 className='bg-slate-900 text-orange-700 font-semibold'>Login Page with redux and appwrite</h1>

      <div className='py-8'>
        <Outlet />
      </div>
   </>
  )
}

export default App
