import { IsUUID } from 'class-validator';
export class CreateBookingDto {
  @IsUUID() tutorId: string;
  @IsUUID() availabilityId: string;
}
