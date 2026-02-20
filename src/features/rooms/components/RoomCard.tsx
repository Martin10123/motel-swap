import { motion } from 'framer-motion';
import { 
  Eye, 
  Users, 
  Wifi, 
  Wind, 
  Tv, 
  Clock,
  Droplet,
  Circle,
  Car,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import type { Room } from '../types/room.types';
import { BookingModal } from './BookingModal';

interface RoomCardProps {
  room: Room;
  onView360: (room: Room) => void;
  index: number;
}

const amenityIcons: Record<string, { icon: React.ComponentType<{ className?: string }>, label: string }> = {
  wifi: { icon: Wifi, label: 'WiFi' },
  airConditioning: { icon: Wind, label: 'A/C' },
  tv: { icon: Tv, label: 'TV' },
  jacuzzi: { icon: Droplet, label: 'Jacuzzi' },
  mirror: { icon: Sparkles, label: 'Espejo' },
  parking: { icon: Car, label: 'Parking' },
};

export function RoomCard({ room, onView360, index }: RoomCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTime, setSelectedTime] = useState<keyof typeof room.pricing>('threeHours');
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customHours, setCustomHours] = useState(4);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const timeOptions = [
    { key: 'threeHours' as const, label: '3h', duration: '3 horas' },
    { key: 'sixHours' as const, label: '6h', duration: '6 horas' },
    { key: 'twelveHours' as const, label: '12h', duration: '12 horas' },
    { key: 'fullNight' as const, label: 'Noche', duration: 'Noche completa' },
  ];

  const calculateCustomPrice = (hours: number) => {
    // Precio por hora basado en la tarifa de 3 horas
    const hourlyRate = room.pricing.threeHours / 3;
    return Math.round(hourlyRate * hours);
  };

  // Obtener horarios disponibles (solo los próximos 6 slots)
  const availableSlots = room.timeSlots?.filter(slot => slot.available).slice(0, 6) || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20 transition-all overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <motion.img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Número de habitación */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-sm shadow-lg">
          #{room.roomNumber}
        </div>

        {/* Badge de disponibilidad */}
        <div className="absolute top-3 right-3">
          {room.available ? (
            <div className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-linear-to-r from-green-500 to-emerald-600 flex items-center gap-1.5 shadow-lg">
              <Circle className="w-2 h-2 fill-white animate-pulse" />
              Disponible
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-linear-to-r from-red-500 to-rose-600 flex flex-col items-center leading-tight shadow-lg">
              <span>Ocupada</span>
              {room.occupiedUntil && (
                <span className="text-[10px] opacity-90">Hasta {room.occupiedUntil}</span>
              )}
            </div>
          )}
        </div>

        {/* Overlay con botón 360° */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-linear-to-br from-purple-900/90 via-pink-900/90 to-red-900/90 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => onView360(room)}
            className="px-5 py-2.5 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-lg font-bold flex items-center gap-2 hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg"
          >
            <Eye className="w-4 h-4" />
            Ver Tour 360°
          </motion.button>
        </motion.div>

        {/* Badge 360° */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-linear-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg">
          <div className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" />
          360°
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-bold text-white text-base leading-tight">{room.name}</h3>
              <span className="inline-block mt-1 px-2 py-0.5 bg-linear-to-r from-purple-500/20 to-pink-500/20 text-pink-300 rounded text-xs font-semibold border border-purple-500/30">
                {room.type}
              </span>
            </div>
          </div>
        </div>

        {/* Próximo disponible si está ocupada */}
        {!room.available && room.nextAvailable && (
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">Disponible desde {room.nextAvailable}</span>
          </div>
        )}

        {/* Información básica */}
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-pink-400" />
            <span>{room.capacity} personas</span>
          </div>
          <span className="text-gray-600">•</span>
          <span className="text-xs">{room.bedType}</span>
        </div>

        {/* Amenidades destacadas */}
        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 5).map((amenity) => {
            const amenityData = amenityIcons[amenity];
            if (!amenityData) return null;
            const Icon = amenityData.icon;
            return (
              <div
                key={amenity}
                className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 rounded text-xs text-purple-300 border border-purple-500/30"
                title={amenityData.label}
              >
                <Icon className="w-3 h-3" />
                <span>{amenityData.label}</span>
              </div>
            );
          })}
        </div>

        {/* Horarios disponibles */}
        {room.available && availableSlots.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-1">
              🕐 Horarios disponibles hoy:
            </p>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTimeSlot(slot.startTime)}
                  className={`px-2 py-1.5 rounded text-xs font-bold transition-all ${
                    selectedTimeSlot === slot.startTime
                      ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/50'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {slot.startTime}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selectores de tiempo */}
        <div>
          <p className="text-xs font-medium text-gray-400 mb-2">⏰ Duración:</p>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {timeOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => {
                  setSelectedTime(option.key);
                  setShowCustomTime(false);
                }}
                className={`px-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedTime === option.key && !showCustomTime
                    ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {/* Botón de tiempo personalizado */}
          <button
            onClick={() => setShowCustomTime(!showCustomTime)}
            className={`w-full mt-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              showCustomTime
                ? 'bg-linear-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            ⏱️ Tiempo Personalizado
          </button>
          {/* Input de tiempo personalizado */}
          {showCustomTime && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 p-3 bg-gray-800/50 rounded-lg border border-purple-500/30"
            >
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={customHours}
                  onChange={(e) => setCustomHours(parseInt(e.target.value))}
                  className="flex-1 accent-purple-600"
                />
                <span className="text-sm font-bold text-pink-400 min-w-[60px]">{customHours}h</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Mínimo 4 horas</p>
            </motion.div>
          )}
        </div>

        {/* Precio y botón de reserva */}
        <div className="pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {selectedTimeSlot && room.available ? (
                <p className="text-xs text-green-400 mb-1 font-medium flex items-center gap-1">
                  ✓ {selectedTimeSlot} • {showCustomTime ? `${customHours}h` : timeOptions.find(t => t.key === selectedTime)?.duration}
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  {showCustomTime ? `${customHours} horas` : timeOptions.find(t => t.key === selectedTime)?.duration}
                </p>
              )}
              <p className="text-2xl font-bold bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {showCustomTime ? formatPrice(calculateCustomPrice(customHours)) : formatPrice(room.pricing[selectedTime])}
              </p>
            </div>
            <button
              disabled={!room.available || (!selectedTimeSlot && room.available)}
              onClick={() => {
                if (room.available && selectedTimeSlot) {
                  setShowBookingModal(true);
                }
              }}
              className={`px-4 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
                room.available && selectedTimeSlot
                  ? 'bg-linear-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600'
              }`}
            >
              {!room.available ? 'No disponible' : !selectedTimeSlot ? 'Elige hora' : '🔥 Reservar'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de reserva */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        room={room}
        selectedTimeSlot={selectedTimeSlot}
        selectedDuration={selectedTime}
        customHours={showCustomTime ? customHours : undefined}
      />
    </motion.div>
  );
}
