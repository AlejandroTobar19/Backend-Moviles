import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Availability } from '../entities/entities';
import { randomUUID } from 'crypto';

@Injectable()
export class AvailabilityService {
  private items = new Map<string, Availability>(); 

  listByTutor(tutorId: string): Availability[] {
    return Array.from(this.items.values()).filter(a => a.tutorId === tutorId);
  }

  upsert(tutorId: string, id: string | undefined, start: Date, end: Date): Availability {
    if (end <= start) throw new BadRequestException('Invalid interval');
    if (id) {
      const existing = this.items.get(id);
      if (!existing) throw new NotFoundException('Availability not found');
      if (existing.tutorId !== tutorId) throw new BadRequestException('Cannot edit others availability');
      if (existing.isBooked) throw new BadRequestException('Cannot edit a booked slot');
      const updated = { ...existing, start, end, updatedAt: new Date() };
      this.items.set(id, updated);
      return updated;
    } else {
      const created: Availability = {
        id: randomUUID(),
        tutorId,
        start, end,
        isBooked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.items.set(created.id, created);
      return created;
    }
  }

  remove(tutorId: string, id: string) {
    const a = this.items.get(id);
    if (!a) throw new NotFoundException('Availability not found');
    if (a.tutorId !== tutorId) throw new BadRequestException('Cannot delete others availability');
    if (a.isBooked) throw new BadRequestException('Cannot delete a booked slot');
    this.items.delete(id);
    return { message: 'Deleted' };
  }

  get(id: string) {
    const a = this.items.get(id);
    if (!a) throw new NotFoundException('Availability not found');
    return a;
  }

  markBooked(id: string) {
    const a = this.get(id);
    if (a.isBooked) throw new BadRequestException('Already booked');
    a.isBooked = true;
    a.updatedAt = new Date();
    this.items.set(id, a);
  }

  markUnbooked(id: string) {
    const a = this.get(id);
    a.isBooked = false;
    a.updatedAt = new Date();
    this.items.set(id, a);
  }
}
