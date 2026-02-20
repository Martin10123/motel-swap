import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Eye,
  X,
  Banknote,
  CreditCard,
  Smartphone,
  BedDouble,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

type ReservationStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

type PaymentMethod = 'cash' | 'card' | 'transfer';

interface Reservation {
  id: string;
  code: string;
  roomNumber: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    vehiclePlate?: string;
  };
  checkIn: string;
  checkOut: string;
  duration: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: ReservationStatus;
  createdAt: string;
}

const mockReservations: Reservation[] = [
  {
    id: '1',
    code: 'RES001',
    roomNumber: '101',
    customer: {
      name: 'Juan Pérez',
      phone: '3001234567',
      email: 'juan@email.com',
      vehiclePlate: 'ABC123',
    },
    checkIn: '14:00',
    checkOut: '17:00',
    duration: '3 horas',
    amount: 45000,
    paymentMethod: 'cash',
    status: 'in-progress',
    createdAt: '2026-02-20 13:30',
  },
  {
    id: '2',
    code: 'RES002',
    roomNumber: '205',
    customer: {
      name: 'María González',
      phone: '3109876543',
      vehiclePlate: 'XYZ789',
    },
    checkIn: '15:30',
    checkOut: '21:30',
    duration: '6 horas',
    amount: 60000,
    paymentMethod: 'card',
    status: 'confirmed',
    createdAt: '2026-02-20 14:00',
  },
  {
    id: '3',
    code: 'RES003',
    roomNumber: '308',
    customer: {
      name: 'Carlos Rodríguez',
      phone: '3201122334',
      email: 'carlos@email.com',
    },
    checkIn: '18:00',
    checkOut: '06:00',
    duration: 'Noche completa',
    amount: 80000,
    paymentMethod: 'transfer',
    status: 'pending',
    createdAt: '2026-02-20 11:20',
  },
  {
    id: '4',
    code: 'RES004',
    roomNumber: '102',
    customer: {
      name: 'Ana Martínez',
      phone: '3157778899',
      vehiclePlate: 'DEF456',
    },
    checkIn: '09:00',
    checkOut: '12:00',
    duration: '3 horas',
    amount: 45000,
    paymentMethod: 'cash',
    status: 'completed',
    createdAt: '2026-02-20 08:45',
  },
  {
    id: '5',
    code: 'RES005',
    roomNumber: '410',
    customer: {
      name: 'Luis Fernández',
      phone: '3006665544',
    },
    checkIn: '16:00',
    checkOut: '22:00',
    duration: '6 horas',
    amount: 60000,
    paymentMethod: 'card',
    status: 'cancelled',
    createdAt: '2026-02-19 20:15',
  },
];

const statusConfig = {
  pending: {
    label: 'Pendiente',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    icon: AlertCircle,
  },
  confirmed: {
    label: 'Confirmada',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    icon: CheckCircle2,
  },
  'in-progress': {
    label: 'En curso',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    icon: Clock,
  },
  completed: {
    label: 'Completada',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelada',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    icon: XCircle,
  },
};

const paymentMethodIcons = {
  cash: Banknote,
  card: CreditCard,
  transfer: Smartphone,
};

const paymentMethodLabels = {
  cash: 'Efectivo',
  card: 'Tarjeta',
  transfer: 'Transferencia',
};

export function ReservationsPage() {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredReservations = mockReservations.filter((reservation) => {
    const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus;
    const matchesSearch =
      reservation.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.roomNumber.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: mockReservations.length,
    pending: mockReservations.filter((r) => r.status === 'pending').length,
    confirmed: mockReservations.filter((r) => r.status === 'confirmed').length,
    inProgress: mockReservations.filter((r) => r.status === 'in-progress').length,
    completed: mockReservations.filter((r) => r.status === 'completed').length,
  };

  const statusFilters = [
    { key: 'all' as const, label: 'Todas', count: stats.total },
    { key: 'pending' as const, label: 'Pendientes', count: stats.pending },
    { key: 'confirmed' as const, label: 'Confirmadas', count: stats.confirmed },
    { key: 'in-progress' as const, label: 'En curso', count: stats.inProgress },
    { key: 'completed' as const, label: 'Completadas', count: stats.completed },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl! md:text-3xl! m-0! font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gestión de Reservas
          </h1>
          <p className="text-gray-400 mt-1">Administra todas las reservas del motel</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Total de hoy:</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {formatPrice(mockReservations.reduce((sum, r) => sum + r.amount, 0))}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Pendientes', value: stats.pending, color: 'from-yellow-600 to-yellow-500' },
          { label: 'Confirmadas', value: stats.confirmed, color: 'from-blue-600 to-blue-500' },
          { label: 'En curso', value: stats.inProgress, color: 'from-green-600 to-emerald-500' },
          { label: 'Completadas', value: stats.completed, color: 'from-gray-600 to-gray-500' },
        ].map((stat) => (
          <Card
            key={stat.label}
            className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50"
          >
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código, cliente o habitación..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {statusFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedStatus(filter.key)}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all border ${
                  selectedStatus === filter.key
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-500 shadow-lg shadow-purple-500/30'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                }`}
              >
                {filter.label} <span className="ml-1 opacity-75">({filter.count})</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Reservations List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredReservations.length === 0 ? (
            <Card className="p-12 text-center bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
              <Calendar className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No se encontraron reservas</p>
              <p className="text-gray-500 text-sm mt-1">Intenta ajustar los filtros de búsqueda</p>
            </Card>
          ) : (
            filteredReservations.map((reservation, index) => {
              const StatusIcon = statusConfig[reservation.status].icon;
              const PaymentIcon = paymentMethodIcons[reservation.paymentMethod];

              return (
                <motion.div
                  key={reservation.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50 hover:border-purple-500/50 transition-all cursor-pointer group">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Left: Main Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-500/30">
                              <BedDouble className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-white">
                                  Habitación {reservation.roomNumber}
                                </h3>
                                <span className="text-xs font-mono text-gray-500">
                                  #{reservation.code}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400">{reservation.createdAt}</p>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                              statusConfig[reservation.status].bgColor
                            } ${statusConfig[reservation.status].borderColor} border`}
                          >
                            <StatusIcon className={`w-4 h-4 ${statusConfig[reservation.status].color}`} />
                            <span className={statusConfig[reservation.status].color}>
                              {statusConfig[reservation.status].label}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {/* Customer */}
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-300">{reservation.customer.name}</span>
                          </div>

                          {/* Phone */}
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-300">{reservation.customer.phone}</span>
                          </div>

                          {/* Time */}
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-300">
                              {reservation.checkIn} - {reservation.checkOut}
                            </span>
                          </div>

                          {/* Duration */}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-300">{reservation.duration}</span>
                          </div>

                          {/* Vehicle */}
                          {reservation.customer.vehiclePlate && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-300 font-mono">
                                {reservation.customer.vehiclePlate}
                              </span>
                            </div>
                          )}

                          {/* Payment */}
                          <div className="flex items-center gap-2">
                            <PaymentIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-300">
                              {paymentMethodLabels[reservation.paymentMethod]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Amount and Actions */}
                      <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-700/50 lg:pl-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Total</p>
                          <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {formatPrice(reservation.amount)}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedReservation(reservation)}
                          className="px-4 py-2 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all border border-gray-700 hover:border-transparent flex items-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/30"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver detalles</span>
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Reservation Detail Modal */}
      <AnimatePresence>
        {selectedReservation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReservation(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 pointer-events-auto max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 p-6 flex items-center justify-between z-10">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Reserva #{selectedReservation.code}
                    </h2>
                    <p className="text-sm text-gray-400">
                      Habitación {selectedReservation.roomNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedReservation(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Status */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-base font-semibold ${
                        statusConfig[selectedReservation.status].bgColor
                      } ${statusConfig[selectedReservation.status].borderColor} border`}
                    >
                      {(() => {
                        const Icon = statusConfig[selectedReservation.status].icon;
                        return (
                          <Icon className={`w-5 h-5 ${statusConfig[selectedReservation.status].color}`} />
                        );
                      })()}
                      <span className={statusConfig[selectedReservation.status].color}>
                        {statusConfig[selectedReservation.status].label}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Información del Cliente
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Nombre</p>
                        <p className="text-sm text-white font-medium">
                          {selectedReservation.customer.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Teléfono</p>
                        <p className="text-sm text-white font-medium">
                          {selectedReservation.customer.phone}
                        </p>
                      </div>
                      {selectedReservation.customer.email && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Email</p>
                          <p className="text-sm text-white font-medium">
                            {selectedReservation.customer.email}
                          </p>
                        </div>
                      )}
                      {selectedReservation.customer.vehiclePlate && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Placa del vehículo</p>
                          <p className="text-sm text-white font-medium font-mono">
                            {selectedReservation.customer.vehiclePlate}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Detalles de la Reserva
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Entrada</p>
                        <p className="text-sm text-white font-medium">{selectedReservation.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Salida</p>
                        <p className="text-sm text-white font-medium">{selectedReservation.checkOut}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Duración</p>
                        <p className="text-sm text-white font-medium">{selectedReservation.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Método de pago</p>
                        <p className="text-sm text-white font-medium">
                          {paymentMethodLabels[selectedReservation.paymentMethod]}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-700 flex items-center justify-between">
                      <span className="text-gray-300 font-medium">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {formatPrice(selectedReservation.amount)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {selectedReservation.status === 'pending' && (
                    <div className="flex gap-3">
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-green-500/30">
                        <CheckCircle2 className="w-5 h-5 inline-block mr-2" />
                        Confirmar
                      </button>
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-red-500/30">
                        <XCircle className="w-5 h-5 inline-block mr-2" />
                        Cancelar
                      </button>
                    </div>
                  )}

                  {selectedReservation.status === 'confirmed' && (
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-purple-500/30">
                      <Clock className="w-5 h-5 inline-block mr-2" />
                      Iniciar Check-in
                    </button>
                  )}

                  {selectedReservation.status === 'in-progress' && (
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-blue-500/30">
                      <CheckCircle2 className="w-5 h-5 inline-block mr-2" />
                      Finalizar Check-out
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
