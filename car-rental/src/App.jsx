import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import User from './components/UserInfo/User'
import Invoice from './components/Invoice/Invoice'
import CarCards from './components/UserInfo/CarCards';
import UserForm from './components/UserInfo/UserForm';
import ErrorMessage from './Error';

function App() {

  return (
    <>
      {/* defined routes */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<User />}></Route>
          <Route path='/form' element={<UserForm />}></Route>
          <Route path='/invoice' element={<Invoice />}></Route>
          <Route path='*' element={<ErrorMessage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
