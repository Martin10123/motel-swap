import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Users,
  BedDouble,
  TrendingUp,
  MessageSquare,
  Settings,
  Tag,
  Camera,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Reservas', href: '/reservas', icon: Calendar, badge: 3 },
  { name: 'Habitaciones', href: '/habitaciones', icon: BedDouble },
  { name: 'Clientes', href: '/clientes', icon: Users },
  { name: 'Promociones', href: '/promociones', icon: Tag },
  { name: 'Tour 360°', href: '/tours', icon: Camera },
  { name: 'Mensajería', href: '/mensajeria', icon: MessageSquare, badge: 12 },
  { name: 'Analítica', href: '/analitica', icon: BarChart3 },
  { name: 'Optimización IA', href: '/ia', icon: TrendingUp },
  { name: 'Configuración', href: '/configuracion', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 sm:top-16 z-50 h-dvh min-w-64 max-w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out',
          'sm:h-[calc(100vh-4rem)] lg:translate-x-0 lg:sticky lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                const Icon = item.icon

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-[#0a1d3a]! text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            'px-2 py-0.5 text-xs font-semibold rounded-full',
                            isActive
                              ? 'bg-white text-[#0a1d3a]'
                              : 'bg-[#0a1d3a] text-white'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User info at bottom */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0a1d3a] flex items-center justify-center text-white font-semibold">
                MS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Motel Simarra
                </p>
                <p className="text-xs text-gray-500 truncate">Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
