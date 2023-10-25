import {Entity, model, property} from '@loopback/repository';

@model()
export class LogrosUsuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  logrosId?: number;

  @property({
    type: 'number',
  })
  usuarioId?: number;

  constructor(data?: Partial<LogrosUsuario>) {
    super(data);
  }
}

export interface LogrosUsuarioRelations {
  // describe navigational properties here
}

export type LogrosUsuarioWithRelations = LogrosUsuario & LogrosUsuarioRelations;
