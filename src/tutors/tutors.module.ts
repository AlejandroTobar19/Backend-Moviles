import { Module } from '@nestjs/common';
import { TutorsService } from './tutors/tutors.service';
import { AvailabilityService } from './availability/availability.service';
import { BookingsService } from './bookings/bookings.service';
import { TutorsController } from './tutors/tutors.controller';
import { AvailabilityController } from './availability/availability.controller';
import { BookingsController } from './bookings/bookings.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [TutorsService, AvailabilityService, BookingsService],
  controllers: [TutorsController, AvailabilityController, BookingsController],
})
export class TutorsModule {}
