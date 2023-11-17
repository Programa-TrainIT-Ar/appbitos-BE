import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Meta, UsuarioPremio, LogrosUsuario} from '../models';
import {MetaRepository} from './meta.repository';
import {UsuarioPremioRepository} from './usuario-premio.repository';
import {LogrosUsuarioRepository} from './logros-usuario.repository';
import { HttpErrors } from '@loopback/rest';


export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly metas: HasManyRepositoryFactory<Meta, typeof Usuario.prototype.id>;

  public readonly usuarioPremios: HasManyRepositoryFactory<UsuarioPremio, typeof Usuario.prototype.id>;

  public readonly logrosUsuarios: HasManyRepositoryFactory<LogrosUsuario, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('MetaRepository') protected metaRepositoryGetter: Getter<MetaRepository>, @repository.getter('UsuarioPremioRepository') protected usuarioPremioRepositoryGetter: Getter<UsuarioPremioRepository>, @repository.getter('LogrosUsuarioRepository') protected logrosUsuarioRepositoryGetter: Getter<LogrosUsuarioRepository>,
  ) {
    super(Usuario, dataSource);
    this.logrosUsuarios = this.createHasManyRepositoryFactoryFor('logrosUsuarios', logrosUsuarioRepositoryGetter,);
    this.registerInclusionResolver('logrosUsuarios', this.logrosUsuarios.inclusionResolver);
    this.usuarioPremios = this.createHasManyRepositoryFactoryFor('usuarioPremios', usuarioPremioRepositoryGetter,);
    this.registerInclusionResolver('usuarioPremios', this.usuarioPremios.inclusionResolver);
    this.metas = this.createHasManyRepositoryFactoryFor('metas', metaRepositoryGetter,);
    this.registerInclusionResolver('metas', this.metas.inclusionResolver);
  }


  async baja(usuario: Usuario ){

    try{
    usuario.activo="false";

    await this.replaceById(usuario.id, usuario)

  }catch(err){

    throw new HttpErrors[404]("Usuario no encontrado")
  }
}

async bajaMail(mail: string, usuario: Usuario ){

// if(this.find({select:['mail']}))
//}


let ob:object=this.find({where:[
  {
    mail: mail
  }
]})

   ob=usuario;

   usuario.activo="false";

    await this.replaceById(usuario.id, usuario)



 

}
 

}

