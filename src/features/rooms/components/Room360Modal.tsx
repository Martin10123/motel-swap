import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Users, 
  Info,
  Clock,
  CircleCheck,
  CircleX,
  Wifi,
  Wind,
  Tv,
  Droplet,
  Sparkles,
  Car
} from 'lucide-react';
import { Room360Viewer } from './Room360Viewer';
import type { Room } from '../types/room.types';
import { useState } from 'react';
import { BookingModal } from './BookingModal';

interface Room360ModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  airConditioning: Wind,
  tv: Tv,
  jacuzzi: Droplet,
  mirror: Sparkles,
  parking: Car,
};

export function Room360Modal({ room, isOpen, onClose }: Room360ModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<'threeHours' | 'sixHours' | 'twelveHours' | 'fullNight'>('threeHours');
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!room) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const availableSlots = room.timeSlots?.filter(slot => slot.available) || [];

  const durationOptions = [
    { key: 'threeHours' as const, label: '3 horas' },
    { key: 'sixHours' as const, label: '6 horas' },
    { key: 'twelveHours' as const, label: '12 horas' },
    { key: 'fullNight' as const, label: 'Noche completa' },
  ];

  const calculateEndTime = (startTime: string, durationKey: 'threeHours' | 'sixHours' | 'twelveHours' | 'fullNight') => {
    const hours = {
      threeHours: 3,
      sixHours: 6,
      twelveHours: 12,
      fullNight: 12,
    }[durationKey];
    
    const [startHour, startMin] = startTime.split(':').map(Number);
    const endHour = (startHour + hours) % 24;
    return `${endHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-700">
              
              {/* Header */}
              <div className="flex items-start justify-between p-4 lg:p-6 border-b border-gray-700 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm z-10">
                <div className="flex-1">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-bold shadow-lg">
                      #{room.roomNumber}
                    </span>
                    
                    <span className="px-3 py-1 bg-purple-500/20 text-pink-300 rounded-full text-xs font-semibold border border-purple-500/30">
                      {room.type}
                    </span>

                    {room.available ? (
                      <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full flex items-center gap-1.5">
                        <CircleCheck className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-300 font-bold text-xs">Disponible Ahora</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full flex items-center gap-1.5">
                        <CircleX className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-red-300 font-bold text-xs">Ocupada hasta {room.occupiedUntil}</span>
                      </div>
                    )}
                  </div>

                  {/* Título */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {room.name}
                  </h2>

                  {/* Info */}
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-pink-400" />
                      <span>Hasta {room.capacity} personas</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <span>{room.bedType}</span>
                  </div>
                </div>
                
                {/* Botones */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`p-2 rounded-lg transition-all ${
                      showInfo 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50' 
                        : 'bg-gray-800 text-gray-400 border border-gray-700'
                    } hover:from-purple-700 hover:to-pink-700`}
                    title={showInfo ? 'Ocultar información' : 'Mostrar información'}
                  >
                    <Info className="w-5 h-5" />
                  </button>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all border border-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Visor 360° */}
              <div className="flex-1 relative overflow-hidden bg-black">
                {/* Loading */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 border-4 border-gray-700 border-t-purple-600 rounded-full animate-spin mx-auto" />
                      <p className="text-gray-400 font-medium">Cargando vista 360°...</p>
                    </div>
                  </div>
                )}

                {/* Visor */}
                <Room360Viewer 
                  imageUrl={room.image360} 
                  autoRotate={true}
                  onLoad={() => setIsLoading(false)}
                />
                
                {/* Panel de información lateral */}
                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 300, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="absolute top-0 right-0 bottom-0 w-80 lg:w-96 bg-gradient-to-br from-gray-900 to-gray-800 border-l border-gray-700 p-6 overflow-y-auto shadow-2xl"
                    >
                      <div className="space-y-6">
                        {/* Horarios disponibles */}
                        {room.available && availableSlots.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                              🕐 Selecciona hora de entrada
                            </h3>
                            <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                              {availableSlots.map((slot, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedTimeSlot(slot.startTime)}
                                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                                    selectedTimeSlot === slot.startTime
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/30'
                                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                                  }`}
                                >
                                  {slot.startTime}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Precios por tiempo */}
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-gray-400 mb-3">⏰ Selecciona duración</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {durationOptions.map((option) => (
                              <button
                                key={option.key}
                                onClick={() => setSelectedDuration(option.key)}
                                className={`p-3 rounded-lg border transition-all ${
                                  selectedDuration === option.key
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 shadow-lg shadow-purple-500/30'
                                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                }`}
                              >
                                <div className="text-xs text-gray-400 mb-1">{option.label}</div>
                                <div className={`text-lg font-bold ${
                                  selectedDuration === option.key ? 'text-white' : 'text-purple-400'
                                }`}>
                                  {formatPrice(room.pricing[option.key])}
                                </div>
                              </button>
                            ))}
                          </div>
                          
                          {/* Resumen de selección */}
                          {selectedTimeSlot && (
                            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                              <div className="text-xs text-gray-400 mb-1">Tu reserva:</div>
                              <div className="text-sm text-green-400 font-bold">
                                {selectedTimeSlot} - {calculateEndTime(selectedTimeSlot, selectedDuration)}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {durationOptions.find(d => d.key === selectedDuration)?.label}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Descripción */}
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">Descripción</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {room.description}
                          </p>
                        </div>

                        {/* Características */}
                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">
                            Características
                          </h3>
                          <div className="space-y-2">
                            {room.hasJacuzzi && (
                              <div className="flex items-center gap-2 p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                                <Droplet className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-300 text-sm font-medium">Jacuzzi privado</span>
                              </div>
                            )}
                            {room.hasTV && (
                              <div className="flex items-center gap-2 p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                                <Tv className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-300 text-sm font-medium">Smart TV</span>
                              </div>
                            )}
                            {room.hasMirror && (
                              <div className="flex items-center gap-2 p-2 bg-pink-500/20 rounded-lg border border-pink-500/30">
                                <Sparkles className="w-4 h-4 text-pink-400" />
                                <span className="text-pink-300 text-sm font-medium">Espejo decorativo</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Amenidades */}
                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">Amenidades</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {room.amenities.map((amenity, index) => {
                              const Icon = amenityIcons[amenity] || Clock;
                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all group border border-gray-700"
                                >
                                  <Icon className="w-4 h-4 text-purple-400 group-hover:text-white" />
                                  <span className="text-xs text-gray-300 group-hover:text-white capitalize">
                                    {amenity.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Botón de reserva */}
                        <button
                          disabled={!room.available || (!selectedTimeSlot && room.available)}
                          onClick={() => {
                            if (room.available && selectedTimeSlot) {
                              setShowBookingModal(true);
                            }
                          }}
                          className={`w-full py-3 font-bold rounded-lg transition-all shadow-lg text-base ${
                            room.available && selectedTimeSlot
                              ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-purple-500/50'
                              : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                          }`}
                        >
                          {!room.available 
                            ? `Disponible desde ${room.nextAvailable}` 
                            : !selectedTimeSlot
                            ? '🕐 Selecciona un horario'
                            : `🔥 Reservar por ${formatPrice(room.pricing[selectedDuration])}`
                          }
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Instrucciones flotantes */}
                {!isLoading && (
                  <div className="absolute bottom-4 left-4 px-4 py-2 bg-gray-900/90 backdrop-blur-md rounded-lg text-white text-sm flex items-center gap-2 border border-purple-500/30 shadow-lg">
                    <span className="text-xl">🖱️</span>
                    <span>
                      <span className="font-bold text-purple-300">Arrastra</span> <span className="text-gray-400">para explorar</span> • 
                      <span className="font-bold text-pink-300"> Scroll</span> <span className="text-gray-400">para zoom</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Modal de reserva */}
          <BookingModal
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            room={room}
            selectedTimeSlot={selectedTimeSlot}
            selectedDuration={selectedDuration}
          />
        </>
      )}
    </AnimatePresence>
  );
}
