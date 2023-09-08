import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Logros, LogrosRelations, TareacompuestaLogro, LogrosUsuario} from '../models';
import {TareacompuestaLogroRepository} from './tareacompuesta-logro.repository';
import {LogrosUsuarioRepository} from './logros-usuario.repository';

export class LogrosRepository extends DefaultCrudRepository<
  Logros,
  typeof Logros.prototype.id,
  LogrosRelations
> {

  public readonly tareacompuestaLogroes: HasManyRepositoryFactory<TareacompuestaLogro, typeof Logros.prototype.id>;

  public readonly logrosUsuarios: HasManyRepositoryFactory<LogrosUsuario, typeof Logros.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('TareacompuestaLogroRepository') protected tareacompuestaLogroRepositoryGetter: Getter<TareacompuestaLogroRepository>, @repository.getter('LogrosUsuarioRepository') protected logrosUsuarioRepositoryGetter: Getter<LogrosUsuarioRepository>,
  ) {
    super(Logros, dataSource);
    this.logrosUsuarios = this.createHasManyRepositoryFactoryFor('logrosUsuarios', logrosUsuarioRepositoryGetter,);
    this.registerInclusionResolver('logrosUsuarios', this.logrosUsuarios.inclusionResolver);
    this.tareacompuestaLogroes = this.createHasManyRepositoryFactoryFor('tareacompuestaLogroes', tareacompuestaLogroRepositoryGetter,);
    this.registerInclusionResolver('tareacompuestaLogroes', this.tareacompuestaLogroes.inclusionResolver);
  }
}
