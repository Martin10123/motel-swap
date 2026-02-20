export interface TimeSlot {
  startTime: string; // formato HH:MM
  endTime: string;
  available: boolean;
}

export interface RoomPricing {
  threeHours: number;  // 3 horas
  sixHours: number;    // 6 horas
  twelveHours: number; // 12 horas
  fullNight: number;   // noche completa
}

export interface Room {
  id: string;
  roomNumber: string;
  name: string;
  type: string;
  description: string;
  pricing: RoomPricing;
  currency: string;
  image: string;
  image360: string;
  capacity: number;
  amenities: string[];
  available: boolean;
  occupiedUntil?: string; // hora en formato HH:MM si está ocupada
  nextAvailable?: string; // próximo horario disponible
  bedType: string;
  hasJacuzzi: boolean;
  hasTV: boolean;
  hasMirror: boolean;
  timeSlots: TimeSlot[]; // horarios del día
}

export type RoomAmenity = 
  | 'wifi' 
  | 'airConditioning' 
  | 'tv' 
  | 'jacuzzi'
  | 'mirror'
  | 'shower'
  | 'parking';
