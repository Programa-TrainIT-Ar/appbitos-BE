import {Entity, model, property, hasMany} from '@loopback/repository';
import {UsuarioPremio} from './usuario-premio.model';

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

  @hasMany(() => UsuarioPremio)
  usuarioPremios: UsuarioPremio[];

  constructor(data?: Partial<Premio>) {
    super(data);
  }
}

export interface PremioRelations {
  // describe navigational properties here
}

export type PremioWithRelations = Premio & PremioRelations;
