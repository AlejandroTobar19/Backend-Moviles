import { IsString, IsDateString, IsIn, IsNotEmpty } from 'class-validator';

export class CrearTareaDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'La materia es obligatoria' })
  materia: string;

  @IsDateString({}, { message: 'La fecha de entrega debe tener formato válido (YYYY-MM-DD)' })
  fechaEntrega: string;

  @IsIn(['baja', 'media', 'alta'], { message: 'La prioridad debe ser baja, media o alta' })
  prioridad: 'baja' | 'media' | 'alta';
}
