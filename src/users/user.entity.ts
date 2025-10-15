export type Role = 'student' | 'tutor';

export class User {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  name?: string;
  career?: string;
  subjects?: string[];
  theme?: 'light' | 'dark';
  createdAt: Date;
  updatedAt: Date;
}
