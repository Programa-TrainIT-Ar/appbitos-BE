import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Meta, MetaRelations, Usuario, TareaCompuesta, CaTareas} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {TareaCompuestaRepository} from './tarea-compuesta.repository';
import {CaTareasRepository} from './ca-tareas.repository';

export class MetaRepository extends DefaultCrudRepository<
  Meta,
  typeof Meta.prototype.id,
  MetaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Meta.prototype.id>;

  public readonly tareaCompuestas: HasManyRepositoryFactory<TareaCompuesta, typeof Meta.prototype.id>;

  public readonly caTareas: HasManyRepositoryFactory<CaTareas, typeof Meta.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('TareaCompuestaRepository') protected tareaCompuestaRepositoryGetter: Getter<TareaCompuestaRepository>, @repository.getter('CaTareasRepository') protected caTareasRepositoryGetter: Getter<CaTareasRepository>,
  ) {
    super(Meta, dataSource);
    this.caTareas = this.createHasManyRepositoryFactoryFor('caTareas', caTareasRepositoryGetter,);
    this.registerInclusionResolver('caTareas', this.caTareas.inclusionResolver);
    this.tareaCompuestas = this.createHasManyRepositoryFactoryFor('tareaCompuestas', tareaCompuestaRepositoryGetter,);
    this.registerInclusionResolver('tareaCompuestas', this.tareaCompuestas.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
