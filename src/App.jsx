import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import Profile from './pages/Profile/Profile'
import Cart from './components/Cart/Cart'
import ProductDetails from './components/ProductDetails/ProductDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' Component={HomePage}   /> 
      <Route path='/login' Component={LoginPage}   /> 
      <Route path='/signup' Component={SignupPage}   /> 
      <Route path='/product/:id' Component={ProductDetails}   /> 
      <Route path='/cart' Component={Cart}   /> 
      <Route path='/profile' Component={Profile}   /> 
      
    </Routes>  
    
    </BrowserRouter>
  )
}

export default App
