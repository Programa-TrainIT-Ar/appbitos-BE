import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {TareaCompuesta} from './tarea-compuesta.model';
import {CaTareas} from './ca-tareas.model';
import {TareaSimple} from './tarea-simple.model';

@model()
export class Meta extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'boolean',
    required: true,
  })
  eliminado: boolean;

  @property({
    type: 'string',
    required: true,
  })
  objetivo: string;

/* @property({
    type: 'array',
    required: true,
  })
  lista: CaTareas;*/

  @belongsTo(() => Usuario)
  usuarioId: number;

 /* @hasMany(() => TareaCompuesta, TareaSimple)
  caTareas: CaTareas[];*/

/*
  @hasMany(() => TareaCompuesta)
  tareaCompuestas: TareaCompuesta[];
*/
  constructor(data?: Partial<Meta>) {
    super(data);
  }
}

export interface MetaRelations {
  // describe navigational properties here
}

export type MetaWithRelations = Meta & MetaRelations;
