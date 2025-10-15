import { Injectable, NotFoundException } from '@nestjs/common';
import { User, Role } from './user.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users = new Map<string, User>();
  private usersByEmail = new Map<string, User>();

  async create(email: string, rawPassword: string, role: Role): Promise<User> {
    const lower = email.toLowerCase();
    if (this.usersByEmail.has(lower)) throw new Error('EMAIL_TAKEN');
    const u: User = {
      id: randomUUID(),
      email: lower,
      passwordHash: await bcrypt.hash(rawPassword, 10),
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      theme: 'light',
      subjects: [],
    };
    this.users.set(u.id, u);
    this.usersByEmail.set(lower, u);
    return { ...u };
  }

  async findByEmail(email: string) {
    const u = this.usersByEmail.get(email.toLowerCase());
    return u ? { ...u } : undefined;
  }

  async findById(id: string) {
    const u = this.users.get(id);
    if (!u) throw new NotFoundException('User not found');
    return { ...u };
  }

  async updateProfile(
    userId: string,
    data: Partial<Pick<User, 'name' | 'career' | 'subjects' | 'theme'>>,
  ) {
    const u = this.users.get(userId);
    if (!u) throw new NotFoundException('User not found');
    const updated = { ...u, ...data, updatedAt: new Date() };
    this.users.set(userId, updated);
    this.usersByEmail.set(updated.email, updated);
    const { passwordHash, ...safe } = updated as any;
    return safe;
  }
}
