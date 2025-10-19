import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { TutorProfile } from '../entities/entities';

@Injectable()
export class TutorsService {
  private profiles = new Map<string, TutorProfile>(); // key: tutorId

  constructor(private readonly users: UsersService) {}

  private ensureTutorExists(tutorId: string) {
    const u = this.users.getAll().find(x => x.id === tutorId && x.role === 'tutor');
    if (!u) throw new NotFoundException('Tutor not found');
    return u;
  }

  getOrSeedProfile(tutorId: string): TutorProfile {
    this.ensureTutorExists(tutorId);
    const existing = this.profiles.get(tutorId);
    if (existing) return existing;
    const seeded: TutorProfile = {
      tutorId,
      subjects: ['General'],
      hourlyRate: 10,
      rating: 4.5,
      bio: 'Tutor',
    };
    this.profiles.set(tutorId, seeded);
    return seeded;
  }

  listTutors(subject?: string, minRating?: number, maxRate?: number) {
    const tutors = this.users.getAll().filter(u => u.role === 'tutor');
    return tutors
      .map(u => this.getOrSeedProfile(u.id))
      .filter(p => {
        if (subject && !p.subjects.map(s => s.toLowerCase()).includes(subject.toLowerCase())) return false;
        if (minRating != null && (p.rating ?? 0) < minRating) return false;
        if (maxRate != null && p.hourlyRate > maxRate) return false;
        return true;
      });
  }

  getTutor(tutorId: string) {
    return this.getOrSeedProfile(tutorId);
  }
}
