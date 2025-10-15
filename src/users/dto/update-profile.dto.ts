import { IsArray, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  career?: string;

  @IsOptional()
  @IsArray()
  subjects?: string[];
}

export class UpdateThemeDto {
  @IsIn(['light', 'dark'])
  theme: 'light' | 'dark';
}
