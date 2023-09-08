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
  Premio,
  UsuarioPremio,
} from '../models';
import {PremioRepository} from '../repositories';

export class PremioUsuarioPremioController {
  constructor(
    @repository(PremioRepository) protected premioRepository: PremioRepository,
  ) { }

  @get('/premios/{id}/usuario-premios', {
    responses: {
      '200': {
        description: 'Array of Premio has many UsuarioPremio',
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
    return this.premioRepository.usuarioPremios(id).find(filter);
  }

  @post('/premios/{id}/usuario-premios', {
    responses: {
      '200': {
        description: 'Premio model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioPremio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Premio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPremio, {
            title: 'NewUsuarioPremioInPremio',
            optional: ['premioId']
          }),
        },
      },
    }) usuarioPremio: Omit<UsuarioPremio, 'id'>,
  ): Promise<UsuarioPremio> {
    return this.premioRepository.usuarioPremios(id).create(usuarioPremio);
  }

  @patch('/premios/{id}/usuario-premios', {
    responses: {
      '200': {
        description: 'Premio.UsuarioPremio PATCH success count',
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
    return this.premioRepository.usuarioPremios(id).patch(usuarioPremio, where);
  }

  @del('/premios/{id}/usuario-premios', {
    responses: {
      '200': {
        description: 'Premio.UsuarioPremio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UsuarioPremio)) where?: Where<UsuarioPremio>,
  ): Promise<Count> {
    return this.premioRepository.usuarioPremios(id).delete(where);
  }
}
