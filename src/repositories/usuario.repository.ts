import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Meta, UsuarioPremio} from '../models';
import {MetaRepository} from './meta.repository';
import {UsuarioPremioRepository} from './usuario-premio.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly metas: HasManyRepositoryFactory<Meta, typeof Usuario.prototype.id>;

  public readonly usuarioPremios: HasManyRepositoryFactory<UsuarioPremio, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('MetaRepository') protected metaRepositoryGetter: Getter<MetaRepository>, @repository.getter('UsuarioPremioRepository') protected usuarioPremioRepositoryGetter: Getter<UsuarioPremioRepository>,
  ) {
    super(Usuario, dataSource);
    this.usuarioPremios = this.createHasManyRepositoryFactoryFor('usuarioPremios', usuarioPremioRepositoryGetter,);
    this.registerInclusionResolver('usuarioPremios', this.usuarioPremios.inclusionResolver);
    this.metas = this.createHasManyRepositoryFactoryFor('metas', metaRepositoryGetter,);
    this.registerInclusionResolver('metas', this.metas.inclusionResolver);
  }
}
