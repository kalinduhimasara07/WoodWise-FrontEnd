import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HeaderButtons from './components/headerButtons'
import Header from './components/header'
import Sidebar from './components/slideBar'
import MillDashboard from './pages/millDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes path="/">
          <Route path='/' element={<MillDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
