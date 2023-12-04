import {Entity, model, property, hasMany} from '@loopback/repository';
import {TareasimpleTareacompuesta} from './tareasimple-tareacompuesta.model';
import { CaTareas } from './ca-tareas.model';

@model()
export class TareaSimple extends Entity implements CaTareas{


  @hasMany(() => TareasimpleTareacompuesta)
  tareasimpleTareacompuestas: TareasimpleTareacompuesta[];

  constructor(data?: Partial<TareaSimple>) {
    super(data);
  }
  Titulo: string;
  id?: number | undefined;
  completado: boolean;
  Descripcion: string;
  metaId: number;
}

export interface TareaSimpleRelations {
  // describe navigational properties here
}

export type TareaSimpleWithRelations = TareaSimple & TareaSimpleRelations;
