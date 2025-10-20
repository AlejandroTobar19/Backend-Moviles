export class Tarea {
  id: string;
  usuarioId: string;
  titulo: string;
  materia: string;
  fechaEntrega: string;
  prioridad: 'baja' | 'media' | 'alta';
  completada: boolean;
}
