import { PartialType } from '@nestjs/mapped-types';
import { CrearTareaDto } from './create-task.dto';

export class ActualizarTareaDto extends PartialType(CrearTareaDto) {
  completada?: boolean;
}
