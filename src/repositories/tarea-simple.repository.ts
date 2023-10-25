import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TareaSimple, TareaSimpleRelations, TareasimpleTareacompuesta} from '../models';
import {TareasimpleTareacompuestaRepository} from './tareasimple-tareacompuesta.repository';

export class TareaSimpleRepository extends DefaultCrudRepository<
  TareaSimple,
  typeof TareaSimple.prototype.id,
  TareaSimpleRelations
> {

  public readonly tareasimpleTareacompuestas: HasManyRepositoryFactory<TareasimpleTareacompuesta, typeof TareaSimple.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('TareasimpleTareacompuestaRepository') protected tareasimpleTareacompuestaRepositoryGetter: Getter<TareasimpleTareacompuestaRepository>,
  ) {
    super(TareaSimple, dataSource);
    this.tareasimpleTareacompuestas = this.createHasManyRepositoryFactoryFor('tareasimpleTareacompuestas', tareasimpleTareacompuestaRepositoryGetter,);
    this.registerInclusionResolver('tareasimpleTareacompuestas', this.tareasimpleTareacompuestas.inclusionResolver);
  }
}
