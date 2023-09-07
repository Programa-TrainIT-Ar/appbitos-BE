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
  Meta,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioMetaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/metas', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Meta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Meta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Meta>,
  ): Promise<Meta[]> {
    return this.usuarioRepository.metas(id).find(filter);
  }

  @post('/usuarios/{id}/metas', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Meta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meta, {
            title: 'NewMetaInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) meta: Omit<Meta, 'id'>,
  ): Promise<Meta> {
    return this.usuarioRepository.metas(id).create(meta);
  }

  @patch('/usuarios/{id}/metas', {
    responses: {
      '200': {
        description: 'Usuario.Meta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meta, {partial: true}),
        },
      },
    })
    meta: Partial<Meta>,
    @param.query.object('where', getWhereSchemaFor(Meta)) where?: Where<Meta>,
  ): Promise<Count> {
    return this.usuarioRepository.metas(id).patch(meta, where);
  }

  @del('/usuarios/{id}/metas', {
    responses: {
      '200': {
        description: 'Usuario.Meta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Meta)) where?: Where<Meta>,
  ): Promise<Count> {
    return this.usuarioRepository.metas(id).delete(where);
  }
}
