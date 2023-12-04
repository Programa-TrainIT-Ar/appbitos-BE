import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {CaTareas, CaTareasRelations, Meta} from '../models';
import {MetaRepository} from './meta.repository';

export class CaTareasRepository extends DefaultCrudRepository<
  CaTareas,
  typeof CaTareas.prototype.id,
  CaTareasRelations
> {

  public readonly meta: BelongsToAccessor<Meta, typeof CaTareas.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('MetaRepository') protected metaRepositoryGetter: Getter<MetaRepository>,
  ) {
    super(CaTareas, dataSource);
    this.meta = this.createBelongsToAccessorFor('meta', metaRepositoryGetter,);
    this.registerInclusionResolver('meta', this.meta.inclusionResolver);
  }
}
