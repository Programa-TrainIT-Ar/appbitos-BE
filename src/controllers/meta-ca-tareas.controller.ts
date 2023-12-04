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
  Meta,
  CaTareas,
} from '../models';
import {MetaRepository} from '../repositories';

export class MetaCaTareasController {
  constructor(
    @repository(MetaRepository) protected metaRepository: MetaRepository,
  ) { }

  @get('/metas/{id}/ca-tareas', {
    responses: {
      '200': {
        description: 'Array of Meta has many CaTareas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CaTareas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CaTareas>,
  ): Promise<CaTareas[]> {
    return this.metaRepository.caTareas(id).find(filter);
  }

  @post('/metas/{id}/ca-tareas', {
    responses: {
      '200': {
        description: 'Meta model instance',
        content: {'application/json': {schema: getModelSchemaRef(CaTareas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Meta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaTareas, {
            title: 'NewCaTareasInMeta',
            exclude: ['id'],
            optional: ['metaId']
          }),
        },
      },
    }) caTareas: Omit<CaTareas, 'id'>,
  ): Promise<CaTareas> {
    return this.metaRepository.caTareas(id).create(caTareas);
  }

  @patch('/metas/{id}/ca-tareas', {
    responses: {
      '200': {
        description: 'Meta.CaTareas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaTareas, {partial: true}),
        },
      },
    })
    caTareas: Partial<CaTareas>,
    @param.query.object('where', getWhereSchemaFor(CaTareas)) where?: Where<CaTareas>,
  ): Promise<Count> {
    return this.metaRepository.caTareas(id).patch(caTareas, where);
  }

  @del('/metas/{id}/ca-tareas', {
    responses: {
      '200': {
        description: 'Meta.CaTareas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CaTareas)) where?: Where<CaTareas>,
  ): Promise<Count> {
    return this.metaRepository.caTareas(id).delete(where);
  }
}
