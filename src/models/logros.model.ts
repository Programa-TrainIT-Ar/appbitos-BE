import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Logros>) {
    super(data);
  }
}

export interface LogrosRelations {
  // describe navigational properties here
}

export type LogrosWithRelations = Logros & LogrosRelations;
