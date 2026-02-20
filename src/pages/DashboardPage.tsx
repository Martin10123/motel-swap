import {
  BedDouble,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'

export function DashboardPage() {
  const stats = [
    {
      name: 'Ocupación Actual',
      value: '75%',
      icon: BedDouble,
      trend: '+12%',
      trendUp: true,
    },
    {
      name: 'Reservas Hoy',
      value: '24',
      icon: Calendar,
      trend: '+8%',
      trendUp: true,
    },
    {
      name: 'Ingresos del Día',
      value: '$1,250',
      icon: TrendingUp,
      trend: '+15%',
      trendUp: true,
    },
    {
      name: 'Clientes Nuevos',
      value: '12',
      icon: Users,
      trend: '-3%',
      trendUp: false,
    },
  ]

  const recentBookings = [
    {
      id: 1,
      room: 'Suite Premium',
      customer: 'Juan Pérez',
      time: '14:00 - 18:00',
      status: 'confirmed',
    },
    {
      id: 2,
      room: 'Habitación 101',
      customer: 'María González',
      time: '15:30 - 20:00',
      status: 'pending',
    },
    {
      id: 3,
      room: 'Suite VIP',
      customer: 'Carlos Rodríguez',
      time: '16:00 - 22:00',
      status: 'confirmed',
    },
    {
      id: 4,
      room: 'Habitación 205',
      customer: 'Ana Martínez',
      time: '18:00 - 23:00',
      status: 'in-progress',
    },
  ]

  const roomStatus = [
    { status: 'Disponibles', count: 8, color: 'bg-green-500' },
    { status: 'Ocupadas', count: 12, color: 'bg-blue-500' },
    { status: 'Limpieza', count: 4, color: 'bg-yellow-500' },
    { status: 'Mantenimiento', count: 1, color: 'bg-red-500' },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl! md:text-3xl! m-0! font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Bienvenido al panel de administración de Morel Swap
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-sm font-medium ${
                        stat.trendUp ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {stat.trend}
                    </span>
                    <span className="text-xs text-gray-500">vs ayer</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-500/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">
              Reservas Recientes
            </h2>
            <button className="text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium hover:opacity-80 transition-opacity">
              Ver todas
            </button>
          </div>

          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700/30"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-green-400 shadow-lg shadow-green-400/50'
                        : booking.status === 'in-progress'
                        ? 'bg-blue-400 shadow-lg shadow-blue-400/50'
                        : 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-white">
                      {booking.customer}
                    </p>
                    <p className="text-sm text-gray-400">{booking.room}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {booking.status === 'confirmed' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">
                          Confirmada
                        </span>
                      </>
                    ) : booking.status === 'in-progress' ? (
                      <>
                        <Clock className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-blue-400">En curso</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-yellow-400">
                          Pendiente
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Room status */}
        <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
          <h2 className="text-lg font-semibold text-white mb-6">
            Estado de Habitaciones
          </h2>

          <div className="space-y-4">
            {roomStatus.map((item) => (
              <div key={item.status}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg`} />
                    <span className="text-sm text-gray-300">
                      {item.status}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {item.count}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color} shadow-md`}
                    style={{ width: `${(item.count / 25) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total habitaciones</span>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">25</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
