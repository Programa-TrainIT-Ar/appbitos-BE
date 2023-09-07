import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Meta} from '../models';
import {MetaRepository} from './meta.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly metas: HasManyRepositoryFactory<Meta, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('MetaRepository') protected metaRepositoryGetter: Getter<MetaRepository>,
  ) {
    super(Usuario, dataSource);
    this.metas = this.createHasManyRepositoryFactoryFor('metas', metaRepositoryGetter,);
    this.registerInclusionResolver('metas', this.metas.inclusionResolver);
  }
}
