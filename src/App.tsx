import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage, RegisterPage, ForgotPasswordPage } from './features/auth/pages'
import { MainLayout } from './components/layout'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes (without layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected routes (with layout) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
