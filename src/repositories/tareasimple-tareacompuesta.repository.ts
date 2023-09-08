import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TareasimpleTareacompuesta, TareasimpleTareacompuestaRelations} from '../models';

export class TareasimpleTareacompuestaRepository extends DefaultCrudRepository<
  TareasimpleTareacompuesta,
  typeof TareasimpleTareacompuesta.prototype.id,
  TareasimpleTareacompuestaRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(TareasimpleTareacompuesta, dataSource);
  }
}
