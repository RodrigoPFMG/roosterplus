import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Home } from "./pages/Home"
import { Profiles } from "./pages/Profiles"
import { VideoDetails } from "./pages/VideoDetails"
import { MyList } from "./pages/MyList"
import { Payment } from "./pages/Payment"
import { Account } from "./pages/Account"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rotas públicas — sem proteção */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas — envolvidas pelo ProtectedRoute */}
        <Route path="/home" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/profiles" element={
          <ProtectedRoute><Profiles /></ProtectedRoute>
        } />
        <Route path="/videos/:id" element={
          <ProtectedRoute><VideoDetails /></ProtectedRoute>
        } />
        <Route path="/my-list" element={
          <ProtectedRoute><MyList /></ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute><Payment /></ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute><Account /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App