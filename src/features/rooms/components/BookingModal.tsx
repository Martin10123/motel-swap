import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Banknote, Smartphone, Calendar, Clock, User, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import type { Room } from '../types/room.types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  selectedTimeSlot: string | null;
  selectedDuration: 'threeHours' | 'sixHours' | 'twelveHours' | 'fullNight';
  customHours?: number;
}

type PaymentMethod = 'cash' | 'card' | 'transfer';

export function BookingModal({ 
  isOpen, 
  onClose, 
  room, 
  selectedTimeSlot, 
  selectedDuration,
  customHours 
}: BookingModalProps) {
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehiclePlate: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!room || !selectedTimeSlot) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const durationLabels = {
    threeHours: '3 horas',
    sixHours: '6 horas',
    twelveHours: '12 horas',
    fullNight: 'Noche completa',
  };

  const calculateEndTime = (startTime: string) => {
    const hours = customHours || {
      threeHours: 3,
      sixHours: 6,
      twelveHours: 12,
      fullNight: 12,
    }[selectedDuration];
    
    const [startHour, startMin] = startTime.split(':').map(Number);
    const endHour = (startHour + hours) % 24;
    return `${endHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}`;
  };

  const totalPrice = customHours 
    ? Math.round((room.pricing.threeHours / 3) * customHours)
    : room.pricing[selectedDuration];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío de datos
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setStep('confirmation');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', phone: '', email: '', vehiclePlate: '' });
    setPaymentMethod('cash');
    onClose();
  };

  const paymentMethods = [
    { id: 'cash' as const, icon: Banknote, label: 'Efectivo', description: 'Pago en recepción' },
    { id: 'card' as const, icon: CreditCard, label: 'Tarjeta', description: 'Débito/Crédito' },
    { id: 'transfer' as const, icon: Smartphone, label: 'Transferencia', description: 'Nequi/Daviplata' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
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
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                    {step === 'form' ? 'Completar Reserva' : '¡Reserva Confirmada! 🎉'}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {step === 'form' ? 'Ingresa tus datos para continuar' : 'Tu habitación está lista'}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 'form' ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Resumen de reserva */}
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Resumen de Reserva
                      </h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Habitación</p>
                          <p className="text-white font-semibold">Habitación {room.roomNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Hora de entrada</p>
                          <p className="text-white font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {selectedTimeSlot}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Duración</p>
                          <p className="text-white font-semibold">
                            {customHours ? `${customHours} horas` : durationLabels[selectedDuration]}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Hora de salida</p>
                          <p className="text-white font-semibold">{calculateEndTime(selectedTimeSlot)}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-purple-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 font-medium">Total</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Información del cliente */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Información del Cliente
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Nombre completo *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            placeholder="Juan Pérez"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Teléfono *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                              placeholder="3001234567"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Email (opcional)
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                              placeholder="correo@ejemplo.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Placa del vehículo
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type="text"
                              value={formData.vehiclePlate}
                              onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value.toUpperCase() })}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 uppercase focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                              placeholder="ABC123"
                              maxLength={6}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Método de pago */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-white">Método de Pago</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          const isSelected = paymentMethod === method.id;
                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => setPaymentMethod(method.id)}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                isSelected
                                  ? 'border-purple-500 bg-gradient-to-br from-purple-900/40 to-pink-900/40 shadow-lg shadow-purple-500/20'
                                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                              }`}
                            >
                              <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-purple-400' : 'text-gray-400'}`} />
                              <p className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                {method.label}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">{method.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Procesando...' : `Confirmar y Pagar ${formatPrice(totalPrice)}`}
                      </button>
                    </div>
                  </form>
                ) : (
                  // Confirmación
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50"
                    >
                      <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        ¡Reserva Exitosa!
                      </h3>
                      <p className="text-gray-400">
                        Tu habitación está lista para ti
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Habitación</span>
                        <span className="text-white font-semibold">Habitación {room.roomNumber}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Cliente</span>
                        <span className="text-white font-semibold">{formData.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Entrada</span>
                        <span className="text-white font-semibold">{selectedTimeSlot}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Salida</span>
                        <span className="text-white font-semibold">{calculateEndTime(selectedTimeSlot)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-purple-500/30">
                        <span className="text-gray-300 font-medium">Total Pagado</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-300 mb-2">
                        📱 Código de reserva
                      </p>
                      <p className="text-2xl font-mono font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {Math.random().toString(36).substr(2, 8).toUpperCase()}
                      </p>
                    </div>

                    <button
                      onClick={handleClose}
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-purple-500/50"
                    >
                      Entendido
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
