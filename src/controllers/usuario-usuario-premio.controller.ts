import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  UsuarioPremio,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioUsuarioPremioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/usuario-premios', {
    responses: {
      '200': {
        description: 'Array of Usuario has many UsuarioPremio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UsuarioPremio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UsuarioPremio>,
  ): Promise<UsuarioPremio[]> {
    return this.usuarioRepository.usuarioPremios(id).find(filter);
  }

  @post('/usuarios/{id}/usuario-premios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioPremio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPremio, {
            title: 'NewUsuarioPremioInUsuario',
            optional: ['usuarioId']
          }),
        },
      },
    }) usuarioPremio: Omit<UsuarioPremio, 'id'>,
  ): Promise<UsuarioPremio> {
    return this.usuarioRepository.create(usuarioPremio);
  }

  @patch('/usuarios/{id}/usuario-premios', {
    responses: {
      '200': {
        description: 'Usuario.UsuarioPremio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPremio, {partial: true}),
        },
      },
    })
    usuarioPremio: Partial<UsuarioPremio>,
    @param.query.object('where', getWhereSchemaFor(UsuarioPremio)) where?: Where<UsuarioPremio>,
  ): Promise<Count> {
    return this.usuarioRepository.usuarioPremios(id).patch(usuarioPremio, where);
  }

  @del('/usuarios/{id}/usuario-premios', {
    responses: {
      '200': {
        description: 'Usuario.UsuarioPremio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UsuarioPremio)) where?: Where<UsuarioPremio>,
  ): Promise<Count> {
    return this.usuarioRepository.usuarioPremios(id).delete(where);
  }
}
