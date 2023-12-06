import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TareaCompuesta, TareaCompuestaRelations, TareacompuestaLogro} from '../models';
import {TareacompuestaLogroRepository} from './tareacompuesta-logro.repository';

export class TareaCompuestaRepository extends DefaultCrudRepository<
  TareaCompuesta,
  typeof TareaCompuesta.prototype.id,
  TareaCompuestaRelations
> {

  public readonly tareacompuestaLogroes: HasManyRepositoryFactory<TareacompuestaLogro, typeof TareaCompuesta.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('TareacompuestaLogroRepository') protected tareacompuestaLogroRepositoryGetter: Getter<TareacompuestaLogroRepository>,
  ) {
    super(TareaCompuesta, dataSource);

    this.tareacompuestaLogroes = this.createHasManyRepositoryFactoryFor('tareacompuestaLogroes', tareacompuestaLogroRepositoryGetter,);
    this.registerInclusionResolver('tareacompuestaLogroes', this.tareacompuestaLogroes.inclusionResolver);
  }
}
