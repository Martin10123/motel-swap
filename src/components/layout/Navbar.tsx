import { useState } from 'react'
import {
  Menu,
  Bell,
  ChevronDown,
  Settings,
  User,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onMenuClick: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'Nueva reserva',
      message: 'Habitación Suite - 2:00 PM',
      time: 'Hace 5 min',
      unread: true,
    },
    {
      id: 2,
      title: 'Limpieza completada',
      message: 'Habitación 101 lista',
      time: 'Hace 15 min',
      unread: true,
    },
    {
      id: 3,
      title: 'Mensaje WhatsApp',
      message: 'Cliente pregunta por disponibilidad',
      time: 'Hace 1 hora',
      unread: false,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 gap-4">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Menu button for mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Quick stats */}
          <div className="hidden xl:flex items-center gap-4 mr-4 px-4 border-r border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">Ocupación</p>
              <p className="text-sm font-semibold text-gray-900">75%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Hoy</p>
              <p className="text-sm font-semibold text-[#0a1d3a]">$1,250</p>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-semibold text-sm">Notificaciones</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors',
                          notification.unread && 'bg-blue-50'
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {notification.message}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-200">
                    <button className="w-full text-sm text-[#0a1d3a] font-medium hover:bg-gray-50 rounded py-2 transition-colors">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-[#0a1d3a] flex items-center justify-center text-white text-sm font-semibold">
                MS
              </div>
              <ChevronDown className="w-4 h-4 text-gray-700 hidden md:block" />
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      Motel Simarra
                    </p>
                    <p className="text-xs text-gray-500">admin@motel.com</p>
                  </div>
                  <nav className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <User className="w-4 h-4" />
                      <span>Mi Perfil</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Configuración</span>
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
