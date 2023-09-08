import {Entity, model, property} from '@loopback/repository';

@model()
export class TareacompuestaLogro extends Entity {
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
  logrosId?: number;

  constructor(data?: Partial<TareacompuestaLogro>) {
    super(data);
  }
}

export interface TareacompuestaLogroRelations {
  // describe navigational properties here
}

export type TareacompuestaLogroWithRelations = TareacompuestaLogro & TareacompuestaLogroRelations;
