import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './routes/PrivateRoutes';
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
    </>
  )
}

export default App