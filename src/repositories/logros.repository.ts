import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Logros, LogrosRelations} from '../models';

export class LogrosRepository extends DefaultCrudRepository<
  Logros,
  typeof Logros.prototype.id,
  LogrosRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Logros, dataSource);
  }
}
