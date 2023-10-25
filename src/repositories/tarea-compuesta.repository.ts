import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TareaCompuesta, TareaCompuestaRelations, TareacompuestaLogro, TareasimpleTareacompuesta} from '../models';
import {TareacompuestaLogroRepository} from './tareacompuesta-logro.repository';
import {TareasimpleTareacompuestaRepository} from './tareasimple-tareacompuesta.repository';

export class TareaCompuestaRepository extends DefaultCrudRepository<
  TareaCompuesta,
  typeof TareaCompuesta.prototype.id,
  TareaCompuestaRelations
> {

  public readonly tareacompuestaLogroes: HasManyRepositoryFactory<TareacompuestaLogro, typeof TareaCompuesta.prototype.id>;

  public readonly tareasimpleTareacompuestas: HasManyRepositoryFactory<TareasimpleTareacompuesta, typeof TareaCompuesta.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('TareacompuestaLogroRepository') protected tareacompuestaLogroRepositoryGetter: Getter<TareacompuestaLogroRepository>, @repository.getter('TareasimpleTareacompuestaRepository') protected tareasimpleTareacompuestaRepositoryGetter: Getter<TareasimpleTareacompuestaRepository>,
  ) {
    super(TareaCompuesta, dataSource);
    this.tareasimpleTareacompuestas = this.createHasManyRepositoryFactoryFor('tareasimpleTareacompuestas', tareasimpleTareacompuestaRepositoryGetter,);
    this.registerInclusionResolver('tareasimpleTareacompuestas', this.tareasimpleTareacompuestas.inclusionResolver);
    this.tareacompuestaLogroes = this.createHasManyRepositoryFactoryFor('tareacompuestaLogroes', tareacompuestaLogroRepositoryGetter,);
    this.registerInclusionResolver('tareacompuestaLogroes', this.tareacompuestaLogroes.inclusionResolver);
  }
}
