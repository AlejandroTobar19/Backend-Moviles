import { IsNumberString, IsOptional, IsString } from 'class-validator';
export class ListTutorsQueryDto {
  @IsOptional() @IsString() subject?: string;
  @IsOptional() @IsNumberString() minRating?: string;
  @IsOptional() @IsNumberString() maxRate?: string;
}
