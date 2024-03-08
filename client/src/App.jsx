import { useState } from 'react'
import './App.css'
import Register from './pages/Register/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Logout from './pages/Logout/Logout'
import PasswordReset from './pages/PasswordReset/PasswordReset'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <div className='body-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/resetpassword' element={<PasswordReset />} />
          <Route path='/forgotpassword/:id/:token' element={<ForgotPassword />} />

        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter >
  )
}

export default App
