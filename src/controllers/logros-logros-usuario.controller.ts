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
  Logros,
  LogrosUsuario,
} from '../models';
import {LogrosRepository} from '../repositories';

export class LogrosLogrosUsuarioController {
  constructor(
    @repository(LogrosRepository) protected logrosRepository: LogrosRepository,
  ) { }

  @get('/logros/{id}/logros-usuarios', {
    responses: {
      '200': {
        description: 'Array of Logros has many LogrosUsuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LogrosUsuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<LogrosUsuario>,
  ): Promise<LogrosUsuario[]> {
    return this.logrosRepository.logrosUsuarios(id).find(filter);
  }

  @post('/logros/{id}/logros-usuarios', {
    responses: {
      '200': {
        description: 'Logros model instance',
        content: {'application/json': {schema: getModelSchemaRef(LogrosUsuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Logros.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LogrosUsuario, {
            title: 'NewLogrosUsuarioInLogros',
            exclude: ['id'],
            optional: ['logrosId']
          }),
        },
      },
    }) logrosUsuario: Omit<LogrosUsuario, 'id'>,
  ): Promise<LogrosUsuario> {
    return this.logrosRepository.logrosUsuarios(id).create(logrosUsuario);
  }

  @patch('/logros/{id}/logros-usuarios', {
    responses: {
      '200': {
        description: 'Logros.LogrosUsuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LogrosUsuario, {partial: true}),
        },
      },
    })
    logrosUsuario: Partial<LogrosUsuario>,
    @param.query.object('where', getWhereSchemaFor(LogrosUsuario)) where?: Where<LogrosUsuario>,
  ): Promise<Count> {
    return this.logrosRepository.logrosUsuarios(id).patch(logrosUsuario, where);
  }

  @del('/logros/{id}/logros-usuarios', {
    responses: {
      '200': {
        description: 'Logros.LogrosUsuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(LogrosUsuario)) where?: Where<LogrosUsuario>,
  ): Promise<Count> {
    return this.logrosRepository.logrosUsuarios(id).delete(where);
  }
}
