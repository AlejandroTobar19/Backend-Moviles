import { Injectable, NotFoundException } from '@nestjs/common';
import { Tarea } from './entities/task.entity';
import { CrearTareaDto } from './dto/create-task.dto';
import { ActualizarTareaDto } from './dto/update-task.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  private tareas: Tarea[] = [];

  crear(usuarioId: string, dto: CrearTareaDto): Tarea {
    const tarea: Tarea = {
      id: randomUUID(),
      usuarioId,
      titulo: dto.titulo,
      materia: dto.materia,
      fechaEntrega: dto.fechaEntrega,
      prioridad: dto.prioridad,
      completada: false,
    };
    this.tareas.push(tarea);
    return tarea;
  }

  obtenerTodas(usuarioId: string): Tarea[] {
    return this.tareas.filter(t => t.usuarioId === usuarioId);
  }

  obtenerUna(usuarioId: string, id: string): Tarea {
    const tarea = this.tareas.find(t => t.id === id && t.usuarioId === usuarioId);
    if (!tarea) throw new NotFoundException('Tarea no encontrada');
    return tarea;
  }

  actualizar(usuarioId: string, id: string, dto: ActualizarTareaDto): Tarea {
    const tarea = this.obtenerUna(usuarioId, id);
    Object.assign(tarea, dto);
    return tarea;
  }

  eliminar(usuarioId: string, id: string): { mensaje: string } {
    const index = this.tareas.findIndex(t => t.id === id && t.usuarioId === usuarioId);
    if (index === -1) throw new NotFoundException('Tarea no encontrada');
    this.tareas.splice(index, 1);
    return { mensaje: 'Tarea eliminada correctamente' };
  }

  obtenerCalendario(usuarioId: string): Tarea[] {
    return this.tareas
      .filter(t => t.usuarioId === usuarioId)
      .sort((a, b) => new Date(a.fechaEntrega).getTime() - new Date(b.fechaEntrega).getTime());
  }
}
