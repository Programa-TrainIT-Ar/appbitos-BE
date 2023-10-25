import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioPremio extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  usuarioId?: number;

  @property({
    type: 'number',
  })
  premioId?: number;

  constructor(data?: Partial<UsuarioPremio>) {
    super(data);
  }
}

export interface UsuarioPremioRelations {
  // describe navigational properties here
}

export type UsuarioPremioWithRelations = UsuarioPremio & UsuarioPremioRelations;
