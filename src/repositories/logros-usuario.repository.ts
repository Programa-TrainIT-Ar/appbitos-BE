import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {LogrosUsuario, LogrosUsuarioRelations} from '../models';

export class LogrosUsuarioRepository extends DefaultCrudRepository<
  LogrosUsuario,
  typeof LogrosUsuario.prototype.id,
  LogrosUsuarioRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(LogrosUsuario, dataSource);
  }
}
