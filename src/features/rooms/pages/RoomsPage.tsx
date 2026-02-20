import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, BedDouble, Home } from 'lucide-react';
import { RoomCard } from '../components/RoomCard';
import { Room360Modal } from '../components/Room360Modal';
import { roomsData } from '../data/rooms.data';
import type { Room } from '../types/room.types';

export function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(roomsData);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar habitaciones
  useEffect(() => {
    const filtered = roomsData.filter(room =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(filtered);
  }, [searchTerm]);

  const handleView360 = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRoom(null), 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-6">
        <h1 className="text-2xl! md:text-3xl! m-0! font-bold text-white mb-2 flex items-center gap-2">
          🌙 Habitaciones Disponibles
        </h1>
        <p className="text-purple-200">
          Reserva por horas o noche completa. Disponibilidad en tiempo real
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Habitaciones</p>
              <p className="text-2xl font-bold text-white mt-1">{roomsData.length}</p>
            </div>
            <div className="p-3 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg">
              <BedDouble className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 hover:border-green-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Disponibles Ahora</p>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {roomsData.filter(r => r.available).length}
              </p>
            </div>
            <div className="p-3 bg-linear-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
              <BedDouble className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 hover:border-red-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Ocupadas</p>
              <p className="text-2xl font-bold text-red-400 mt-1">
                {roomsData.filter(r => !r.available).length}
              </p>
            </div>
            <div className="p-3 bg-linear-to-r from-red-500 to-rose-600 rounded-lg shadow-lg">
              <BedDouble className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Ocupación</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">
                {Math.round((roomsData.filter(r => !r.available).length / roomsData.length) * 100)}%
              </p>
            </div>
            <div className="p-3 bg-linear-to-r from-blue-500 to-cyan-600 rounded-lg shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por número, nombre o tipo de habitación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Botón de filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 ${
              showFilters
                ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-800 text-gray-300 border border-gray-700'
            } rounded-lg font-medium flex items-center gap-2 transition-all hover:from-purple-700 hover:to-pink-700`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {/* Panel de filtros (expandible) */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-700"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium transition-all shadow-md shadow-purple-500/50">
                Todas
              </button>
              <button className="px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-all border border-gray-700">
                Solo Disponibles
              </button>
              <button className="px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-all border border-gray-700">
                Con Jacuzzi
              </button>
              <button className="px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-all border border-gray-700">
                Suites VIP
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid de habitaciones */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              onView360={handleView360}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <Home className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            No se encontraron habitaciones
          </h3>
          <p className="text-gray-400">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      )}

      {/* Modal de tour 360° */}
      <Room360Modal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
