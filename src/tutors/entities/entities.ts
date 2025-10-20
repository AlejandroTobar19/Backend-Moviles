export type AvailabilityId = string;
export type BookingId = string;

export interface TutorProfile {
  tutorId: string;        
  subjects: string[];     
  hourlyRate: number;     
  rating?: number;       
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
