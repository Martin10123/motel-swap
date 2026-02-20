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
    <header className="sticky top-0 z-30 h-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 shadow-lg">
      <div className="flex items-center justify-between h-full px-4 gap-4">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Menu button for mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Quick stats */}
          <div className="hidden xl:flex items-center gap-4 mr-4 px-4 border-r border-gray-700">
            <div className="text-center">
              <p className="text-xs text-gray-500">Ocupación</p>
              <p className="text-sm font-semibold text-purple-400">75%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Hoy</p>
              <p className="text-sm font-semibold text-pink-400">$1,250</p>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold rounded-full flex items-center justify-center shadow-lg">
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
                <div className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl border border-gray-700/50 z-50">
                  <div className="p-3 border-b border-gray-700/50">
                    <h3 className="font-semibold text-sm text-white">Notificaciones</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-3 border-b border-gray-700/30 hover:bg-gray-800 cursor-pointer transition-colors',
                          notification.unread && 'bg-gradient-to-r from-purple-900/30 to-pink-900/30'
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {notification.message}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shrink-0 mt-1 shadow-lg shadow-purple-500/50" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-700/50">
                    <button className="w-full text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium hover:opacity-80 rounded py-2 transition-opacity">
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
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-purple-500/30">
                MS
              </div>
              <ChevronDown className="w-4 h-4 text-gray-300 hidden md:block" />
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl border border-gray-700/50 z-50">
                  <div className="p-3 border-b border-gray-700/50">
                    <p className="text-sm font-medium text-white">
                      Motel Simarra
                    </p>
                    <p className="text-xs text-gray-400">admin@motel.com</p>
                  </div>
                  <nav className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                      <User className="w-4 h-4" />
                      <span>Mi Perfil</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Configuración</span>
                    </button>
                    <hr className="my-2 border-gray-700" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 rounded-lg transition-colors">
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
