import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Premio, PremioRelations} from '../models';

export class PremioRepository extends DefaultCrudRepository<
  Premio,
  typeof Premio.prototype.id,
  PremioRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Premio, dataSource);
  }
}
