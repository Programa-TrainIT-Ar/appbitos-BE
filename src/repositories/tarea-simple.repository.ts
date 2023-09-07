import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TareaSimple, TareaSimpleRelations} from '../models';

export class TareaSimpleRepository extends DefaultCrudRepository<
  TareaSimple,
  typeof TareaSimple.prototype.id,
  TareaSimpleRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(TareaSimple, dataSource);
  }
}
