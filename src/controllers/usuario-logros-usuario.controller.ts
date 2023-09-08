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
  LogrosUsuario,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioLogrosUsuarioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/logros-usuarios', {
    responses: {
      '200': {
        description: 'Array of Usuario has many LogrosUsuario',
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
    return this.usuarioRepository.logrosUsuarios(id).find(filter);
  }

  @post('/usuarios/{id}/logros-usuarios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(LogrosUsuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LogrosUsuario, {
            title: 'NewLogrosUsuarioInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) logrosUsuario: Omit<LogrosUsuario, 'id'>,
  ): Promise<LogrosUsuario> {
    return this.usuarioRepository.logrosUsuarios(id).create(logrosUsuario);
  }

  @patch('/usuarios/{id}/logros-usuarios', {
    responses: {
      '200': {
        description: 'Usuario.LogrosUsuario PATCH success count',
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
    return this.usuarioRepository.logrosUsuarios(id).patch(logrosUsuario, where);
  }

  @del('/usuarios/{id}/logros-usuarios', {
    responses: {
      '200': {
        description: 'Usuario.LogrosUsuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(LogrosUsuario)) where?: Where<LogrosUsuario>,
  ): Promise<Count> {
    return this.usuarioRepository.logrosUsuarios(id).delete(where);
  }
}
