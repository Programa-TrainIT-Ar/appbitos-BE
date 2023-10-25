import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TareacompuestaLogro, TareacompuestaLogroRelations} from '../models';

export class TareacompuestaLogroRepository extends DefaultCrudRepository<
  TareacompuestaLogro,
  typeof TareacompuestaLogro.prototype.id,
  TareacompuestaLogroRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(TareacompuestaLogro, dataSource);
  }
}
