import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { AvailabilityService } from './availability.service';
import { UpsertAvailabilityDto } from '../dto/availability.dto';

@Controller('tutors/availability')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('tutor')
export class AvailabilityController {
  constructor(private readonly availability: AvailabilityService) {}

  @Post()
  upsert(@CurrentUser() user: any, @Body() dto: UpsertAvailabilityDto) {
    const start = new Date(dto.startISO);
    const end   = new Date(dto.endISO);
    return this.availability.upsert(user.sub, dto.id, start, end);
  }

  @Delete(':id')
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.availability.remove(user.sub, id);
  }
}
