import {Entity, model, property, hasMany} from '@loopback/repository';
import {TareacompuestaLogro} from './tareacompuesta-logro.model';
import {TareasimpleTareacompuesta} from './tareasimple-tareacompuesta.model';
import { CaTareas } from './ca-tareas.model';

@model()
export class TareaCompuesta extends Entity implements CaTareas {
  


  @hasMany(() => TareacompuestaLogro)
  tareacompuestaLogroes: TareacompuestaLogro[];

  @hasMany(() => TareasimpleTareacompuesta)
  tareasimpleTareacompuestas: TareasimpleTareacompuesta[];

  constructor(data?: Partial<TareaCompuesta>) {
    super(data);
  }
  id?: number | undefined;
  completado: boolean;
  Titulo: string;
  Descripcion: string;
  metaId: number;
}

export interface TareaCompuestaRelations {
  // describe navigational properties here
}

export type TareaCompuestaWithRelations = TareaCompuesta & TareaCompuestaRelations;
