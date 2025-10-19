import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Booking, BookingStatus } from '../entities/entities';
import { randomUUID } from 'crypto';
import { AvailabilityService } from '../availability/availability.service';

@Injectable()
export class BookingsService {
  private bookings = new Map<string, Booking>(); 

  constructor(private readonly availability: AvailabilityService) {}

  listByUser(userId: string, role: 'student' | 'tutor'): Booking[] {
    return Array.from(this.bookings.values()).filter(b =>
      role === 'student' ? b.studentId === userId : b.tutorId === userId
    );
  }

  create(tutorId: string, studentId: string, availabilityId: string): Booking {
    const slot = this.availability.get(availabilityId);
    if (slot.tutorId !== tutorId) throw new BadRequestException('Availability does not belong to tutor');
    if (slot.isBooked) throw new BadRequestException('Slot already booked');

    const now = new Date();
    const booking: Booking = {
      id: randomUUID(),
      tutorId, studentId, availabilityId,
      start: slot.start, end: slot.end,
      status: 'booked',
      createdAt: now, updatedAt: now,
    };
    this.bookings.set(booking.id, booking);
    this.availability.markBooked(availabilityId);
    return booking;
  }

  transition(id: string, next: BookingStatus, actorId: string, actorRole: 'student' | 'tutor') {
    const b = this.bookings.get(id);
    if (!b) throw new NotFoundException('Booking not found');

    if (next === 'cancelled') {
      if (actorId !== b.studentId && actorId !== b.tutorId) throw new BadRequestException('Not your booking');
      if (b.status !== 'booked') throw new BadRequestException('Cannot cancel now');
      b.status = 'cancelled';
      b.updatedAt = new Date();
      this.availability.markUnbooked(b.availabilityId);
      this.bookings.set(b.id, b);
      return b;
    }

    if (next === 'completed') {
      if (actorRole !== 'tutor' || actorId !== b.tutorId) throw new BadRequestException('Only tutor can complete');
      if (b.status !== 'booked') throw new BadRequestException('Cannot complete now');
      b.status = 'completed';
      b.updatedAt = new Date();
      this.bookings.set(b.id, b);
      return b;
    }

    throw new BadRequestException('Invalid transition');
  }
}
