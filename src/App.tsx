import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage, RegisterPage, ForgotPasswordPage } from './features/auth/pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
