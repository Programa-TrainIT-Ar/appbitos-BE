import {Entity, model, property, hasMany} from '@loopback/repository';
import {TareacompuestaLogro} from './tareacompuesta-logro.model';
import {TareasimpleTareacompuesta} from './tareasimple-tareacompuesta.model';

@model()
export class TareaCompuesta extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'boolean',
    required: true,
  })
  asignar_meta: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  completado: boolean;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  metaId?: number;

  @hasMany(() => TareacompuestaLogro)
  tareacompuestaLogroes: TareacompuestaLogro[];

  @hasMany(() => TareasimpleTareacompuesta)
  tareasimpleTareacompuestas: TareasimpleTareacompuesta[];

  constructor(data?: Partial<TareaCompuesta>) {
    super(data);
  }
}

export interface TareaCompuestaRelations {
  // describe navigational properties here
}

export type TareaCompuestaWithRelations = TareaCompuesta & TareaCompuestaRelations;
