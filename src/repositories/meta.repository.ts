import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Meta, MetaRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class MetaRepository extends DefaultCrudRepository<
  Meta,
  typeof Meta.prototype.id,
  MetaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Meta.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Meta, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
