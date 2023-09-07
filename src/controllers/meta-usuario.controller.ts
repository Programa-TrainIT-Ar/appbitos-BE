import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Meta,
  Usuario,
} from '../models';
import {MetaRepository} from '../repositories';

export class MetaUsuarioController {
  constructor(
    @repository(MetaRepository)
    public metaRepository: MetaRepository,
  ) { }

  @get('/metas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Meta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof Meta.prototype.id,
  ): Promise<Usuario> {
    return this.metaRepository.usuario(id);
  }
}
