import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<TareaCompuesta>) {
    super(data);
  }
}

export interface TareaCompuestaRelations {
  // describe navigational properties here
}

export type TareaCompuestaWithRelations = TareaCompuesta & TareaCompuestaRelations;
