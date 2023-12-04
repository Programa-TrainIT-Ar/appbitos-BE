import {Model, model, property, belongsTo, Entity} from '@loopback/repository';
import {Meta} from './meta.model';

@model()
export abstract class CaTareas extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  Titulo: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  completado: boolean;


  @belongsTo(() => Meta)
  metaId: number;

  constructor(data?: Partial<CaTareas>) {
    super(data);
  }
}

export interface CaTareasRelations {
  // describe navigational properties here
}

export type CaTareasWithRelations = CaTareas & CaTareasRelations;
