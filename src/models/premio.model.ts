import {Entity, model, property} from '@loopback/repository';

@model()
export class Premio extends Entity {
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
    type: 'boolean',
    required: true,
  })
  eliminado: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  asignado: boolean;

  @property({
    type: 'object',
    required: true,
  })
  foto: object;


  constructor(data?: Partial<Premio>) {
    super(data);
  }
}

export interface PremioRelations {
  // describe navigational properties here
}

export type PremioWithRelations = Premio & PremioRelations;
