import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { TokenBlacklistService } from './token-blacklist.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly users: UsersService,
        private readonly jwt: JwtService,
        private readonly blacklist: TokenBlacklistService,
    ) { }

    async register(email: string, password: string, role: 'student' | 'tutor') {
        try {
            const user = await this.users.create(email, password, role);
            const token = await this.sign(user.id, user.email, user.role);
            const { passwordHash, ...safe } = user as any;
            return { user: safe, token };
        } catch (e: any) {
            if (e?.message === 'EMAIL_TAKEN') {
                throw new UnauthorizedException('Email already in use');
            }
            throw e;
        }
    }

    async login(email: string, password: string) {
        const user = await this.users.findByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) throw new UnauthorizedException('Invalid credentials');
        const token = await this.sign(user.id, user.email, user.role);
        const { passwordHash, ...safe } = user as any;
        return { user: safe, token };
    }

    async logout(payload: any) {
        if (payload?.jti) this.blacklist.add(payload.jti);
        return { message: 'Logged out' };
    }

    private async sign(sub: string, email: string, role: 'student' | 'tutor') {
        const jti = randomUUID();
        const payload = { sub, email, role, jti };

        // ✅ usa segundos (number). 86400 = 24*60*60
        const expiresIn: number = process.env.JWT_EXPIRES_IN
            ? Number(process.env.JWT_EXPIRES_IN)
            : 86400;

        const opts: JwtSignOptions = {
            secret: process.env.JWT_SECRET || 'devsecret',
            expiresIn, // <- ahora es number y no da error
        };

        return this.jwt.signAsync(payload, opts);
    }
}
