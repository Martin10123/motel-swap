import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage, RegisterPage, ForgotPasswordPage } from './features/auth/pages'
import { RoomsPage } from './features/rooms/pages'
import { MainLayout } from './components/layout'
import { DashboardPage } from './pages/DashboardPage'
import { ReservationsPage } from './pages/ReservationsPage'

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
          <Route path="habitaciones" element={<RoomsPage />} />
          <Route path="reservas" element={<ReservationsPage />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
