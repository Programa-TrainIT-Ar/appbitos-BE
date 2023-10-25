import {Entity, model, property} from '@loopback/repository';

@model()
export class TareasimpleTareacompuesta extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  tareaCompuestaId?: number;

  @property({
    type: 'number',
  })
  tareaSimpleId?: number;

  constructor(data?: Partial<TareasimpleTareacompuesta>) {
    super(data);
  }
}

export interface TareasimpleTareacompuestaRelations {
  // describe navigational properties here
}

export type TareasimpleTareacompuestaWithRelations = TareasimpleTareacompuesta & TareasimpleTareacompuestaRelations;
