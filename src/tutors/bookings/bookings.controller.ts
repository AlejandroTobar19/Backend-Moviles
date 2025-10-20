import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { CreateBookingDto } from '../dto/booking.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookings: BookingsService) {}

  @Get()
  listMine(@CurrentUser() user: any) {
    return this.bookings.listByUser(user.sub, user.role);
  }

  @Post()
  @Roles('student')
  create(@CurrentUser() user: any, @Body() dto: CreateBookingDto) {
    return this.bookings.create(dto.tutorId, user.sub, dto.availabilityId);
  }

  @Put(':id/cancel')
  cancel(@CurrentUser() user: any, @Param('id') id: string) {
    return this.bookings.transition(id, 'cancelled', user.sub, user.role);
  }

  @Put(':id/complete')
  @Roles('tutor')
  complete(@CurrentUser() user: any, @Param('id') id: string) {
    return this.bookings.transition(id, 'completed', user.sub, user.role);
  }
}
