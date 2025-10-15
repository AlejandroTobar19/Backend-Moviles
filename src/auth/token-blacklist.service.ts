import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private invalid = new Set<string>();
  add(jti: string) { this.invalid.add(jti); }
  has(jti: string) { return this.invalid.has(jti); }
}
