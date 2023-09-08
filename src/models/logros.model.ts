import {Entity, model, property, hasMany} from '@loopback/repository';
import {TareacompuestaLogro} from './tareacompuesta-logro.model';
import {LogrosUsuario} from './logros-usuario.model';

@model()
export class Logros extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @hasMany(() => TareacompuestaLogro)
  tareacompuestaLogroes: TareacompuestaLogro[];

  @hasMany(() => LogrosUsuario)
  logrosUsuarios: LogrosUsuario[];

  constructor(data?: Partial<Logros>) {
    super(data);
  }
}

export interface LogrosRelations {
  // describe navigational properties here
}

export type LogrosWithRelations = Logros & LogrosRelations;
