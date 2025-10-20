import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListTutorsQueryDto } from '../dto/list-tutors.dto';
import { TutorsService } from './tutors.service';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutors: TutorsService) {}

  @Get()
  list(@Query() q: ListTutorsQueryDto) {
    const minRating = q.minRating ? parseFloat(q.minRating) : undefined;
    const maxRate   = q.maxRate ? parseFloat(q.maxRate) : undefined;
    return this.tutors.listTutors(q.subject, minRating, maxRate);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tutors.getTutor(id);
  }
}
