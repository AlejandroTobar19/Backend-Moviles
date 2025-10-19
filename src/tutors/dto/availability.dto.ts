import { IsISO8601, IsOptional, IsUUID } from 'class-validator';
export class UpsertAvailabilityDto {
  @IsOptional() @IsUUID() id?: string; // si viene, edita; si no, crea
  @IsISO8601() startISO: string;
  @IsISO8601() endISO: string;
}
