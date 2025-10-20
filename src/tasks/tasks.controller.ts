import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CrearTareaDto } from './dto/create-task.dto';
import { ActualizarTareaDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  crear(@Req() req: any, @Body() dto: CrearTareaDto) {
    return this.tasksService.crear(req.user.sub, dto);
  }

  @Get()
  obtenerTodas(@Req() req: any) {
    return this.tasksService.obtenerTodas(req.user.sub);
  }

  @Get('calendar')
  obtenerCalendario(@Req() req: any) {
    return this.tasksService.obtenerCalendario(req.user.sub);
  }

  @Get(':id')
  obtenerUna(@Req() req: any, @Param('id') id: string) {
    return this.tasksService.obtenerUna(req.user.sub, id);
  }

  @Put(':id')
  actualizar(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: ActualizarTareaDto,
  ) {
    return this.tasksService.actualizar(req.user.sub, id, dto);
  }

  @Delete(':id')
  eliminar(@Req() req: any, @Param('id') id: string) {
    return this.tasksService.eliminar(req.user.sub, id);
  }
}
