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
  TareaSimple,
  TareasimpleTareacompuesta,
} from '../models';
import {TareaSimpleRepository} from '../repositories';

export class TareaSimpleTareasimpleTareacompuestaController {
  constructor(
    @repository(TareaSimpleRepository) protected tareaSimpleRepository: TareaSimpleRepository,
  ) { }

  @get('/tarea-simples/{id}/tareasimple-tareacompuestas', {
    responses: {
      '200': {
        description: 'Array of TareaSimple has many TareasimpleTareacompuesta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TareasimpleTareacompuesta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TareasimpleTareacompuesta>,
  ): Promise<TareasimpleTareacompuesta[]> {
    return this.tareaSimpleRepository.tareasimpleTareacompuestas(id).find(filter);
  }

  @post('/tarea-simples/{id}/tareasimple-tareacompuestas', {
    responses: {
      '200': {
        description: 'TareaSimple model instance',
        content: {'application/json': {schema: getModelSchemaRef(TareasimpleTareacompuesta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TareaSimple.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareasimpleTareacompuesta, {
            title: 'NewTareasimpleTareacompuestaInTareaSimple',
            exclude: ['id'],
            optional: ['tareaSimpleId']
          }),
        },
      },
    }) tareasimpleTareacompuesta: Omit<TareasimpleTareacompuesta, 'id'>,
  ): Promise<TareasimpleTareacompuesta> {
    return this.tareaSimpleRepository.tareasimpleTareacompuestas(id).create(tareasimpleTareacompuesta);
  }

  @patch('/tarea-simples/{id}/tareasimple-tareacompuestas', {
    responses: {
      '200': {
        description: 'TareaSimple.TareasimpleTareacompuesta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareasimpleTareacompuesta, {partial: true}),
        },
      },
    })
    tareasimpleTareacompuesta: Partial<TareasimpleTareacompuesta>,
    @param.query.object('where', getWhereSchemaFor(TareasimpleTareacompuesta)) where?: Where<TareasimpleTareacompuesta>,
  ): Promise<Count> {
    return this.tareaSimpleRepository.tareasimpleTareacompuestas(id).patch(tareasimpleTareacompuesta, where);
  }

  @del('/tarea-simples/{id}/tareasimple-tareacompuestas', {
    responses: {
      '200': {
        description: 'TareaSimple.TareasimpleTareacompuesta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TareasimpleTareacompuesta)) where?: Where<TareasimpleTareacompuesta>,
  ): Promise<Count> {
    return this.tareaSimpleRepository.tareasimpleTareacompuestas(id).delete(where);
  }
}
