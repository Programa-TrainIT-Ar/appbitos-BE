import {Entity, model, property} from '@loopback/repository';
//creado con lb4 model

@model()
export class Prueba extends Entity {
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
  tamano: string;

  @property({
    type: 'string',
    default: 'gris',
  })
  color?: string;


  constructor(data?: Partial<Prueba>) {
    super(data);
  }
}

export interface PruebaRelations {
  // describe navigational properties here
}

export type PruebaWithRelations = Prueba & PruebaRelations;
