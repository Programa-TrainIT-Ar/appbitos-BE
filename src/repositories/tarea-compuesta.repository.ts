import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TareaCompuesta, TareaCompuestaRelations} from '../models';

export class TareaCompuestaRepository extends DefaultCrudRepository<
  TareaCompuesta,
  typeof TareaCompuesta.prototype.id,
  TareaCompuestaRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(TareaCompuesta, dataSource);
  }
}
