import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly blacklist: TokenBlacklistService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'devsecret',
    });
  }

  async validate(payload: any) {
    if (payload?.jti && this.blacklist.has(payload.jti)) {
      throw new UnauthorizedException('Token invalidated');
    }
    return payload; // { sub, email, role, jti }
  }
}
