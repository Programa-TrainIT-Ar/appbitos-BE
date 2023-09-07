import {Entity, model, property} from '@loopback/repository';

@model()
export class TareaSimple extends Entity {
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
  completado: boolean;


  constructor(data?: Partial<TareaSimple>) {
    super(data);
  }
}

export interface TareaSimpleRelations {
  // describe navigational properties here
}

export type TareaSimpleWithRelations = TareaSimple & TareaSimpleRelations;
