export type AvailabilityId = string;
export type BookingId = string;

export interface TutorProfile {
  tutorId: string;        // = User.id con role 'tutor'
  subjects: string[];     // materias impartidas
  hourlyRate: number;     // tarifa por hora
  rating?: number;        // 0..5
  bio?: string;
}

export interface Availability {
  id: AvailabilityId;
  tutorId: string;
  start: Date;
  end: Date;
  isBooked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 'booked' | 'cancelled' | 'completed';

export interface Booking {
  id: BookingId;
  tutorId: string;
  studentId: string;
  availabilityId: AvailabilityId;
  start: Date;
  end: Date;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}
