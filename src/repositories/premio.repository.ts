import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Premio, PremioRelations, UsuarioPremio} from '../models';
import {UsuarioPremioRepository} from './usuario-premio.repository';

export class PremioRepository extends DefaultCrudRepository<
  Premio,
  typeof Premio.prototype.id,
  PremioRelations
> {

  public readonly usuarioPremios: HasManyRepositoryFactory<UsuarioPremio, typeof Premio.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UsuarioPremioRepository') protected usuarioPremioRepositoryGetter: Getter<UsuarioPremioRepository>,
  ) {
    super(Premio, dataSource);
    this.usuarioPremios = this.createHasManyRepositoryFactoryFor('usuarioPremios', usuarioPremioRepositoryGetter,);
    this.registerInclusionResolver('usuarioPremios', this.usuarioPremios.inclusionResolver);
  }
}
