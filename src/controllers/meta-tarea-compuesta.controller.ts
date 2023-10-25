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
  TareaCompuesta,
} from '../models';
import {MetaRepository} from '../repositories';

export class MetaTareaCompuestaController {
  constructor(
    @repository(MetaRepository) protected metaRepository: MetaRepository,
  ) { }

  @get('/metas/{id}/tarea-compuestas', {
    responses: {
      '200': {
        description: 'Array of Meta has many TareaCompuesta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TareaCompuesta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TareaCompuesta>,
  ): Promise<TareaCompuesta[]> {
    return this.metaRepository.tareaCompuestas(id).find(filter);
  }

  @post('/metas/{id}/tarea-compuestas', {
    responses: {
      '200': {
        description: 'Meta model instance',
        content: {'application/json': {schema: getModelSchemaRef(TareaCompuesta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Meta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareaCompuesta, {
            title: 'NewTareaCompuestaInMeta',
            exclude: ['id'],
            optional: ['metaId']
          }),
        },
      },
    }) tareaCompuesta: Omit<TareaCompuesta, 'id'>,
  ): Promise<TareaCompuesta> {
    return this.metaRepository.tareaCompuestas(id).create(tareaCompuesta);
  }

  @patch('/metas/{id}/tarea-compuestas', {
    responses: {
      '200': {
        description: 'Meta.TareaCompuesta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareaCompuesta, {partial: true}),
        },
      },
    })
    tareaCompuesta: Partial<TareaCompuesta>,
    @param.query.object('where', getWhereSchemaFor(TareaCompuesta)) where?: Where<TareaCompuesta>,
  ): Promise<Count> {
    return this.metaRepository.tareaCompuestas(id).patch(tareaCompuesta, where);
  }

  @del('/metas/{id}/tarea-compuestas', {
    responses: {
      '200': {
        description: 'Meta.TareaCompuesta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TareaCompuesta)) where?: Where<TareaCompuesta>,
  ): Promise<Count> {
    return this.metaRepository.tareaCompuestas(id).delete(where);
  }
}
