import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {UsuarioPremio, UsuarioPremioRelations} from '../models';

export class UsuarioPremioRepository extends DefaultCrudRepository<
  UsuarioPremio,
  UsuarioPremioRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(UsuarioPremio, dataSource);
  }
}
