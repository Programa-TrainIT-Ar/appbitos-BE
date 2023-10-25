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
  TareaCompuesta,
  TareasimpleTareacompuesta,
} from '../models';
import {TareaCompuestaRepository} from '../repositories';

export class TareaCompuestaTareasimpleTareacompuestaController {
  constructor(
    @repository(TareaCompuestaRepository) protected tareaCompuestaRepository: TareaCompuestaRepository,
  ) { }

  @get('/tarea-compuestas/{id}/tareasimple-tareacompuestas', {
    responses: {
      '200': {
        description: 'Array of TareaCompuesta has many TareasimpleTareacompuesta',
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
    return this.tareaCompuestaRepository.tareasimpleTareacompuestas(id).find(filter);
  }

  @post('/tarea-compuestas/{id}/tareasimple-tareacompuestas', {
    responses: {
      '200': {
        description: 'TareaCompuesta model instance',
        content: {'application/json': {schema: getModelSchemaRef(TareasimpleTareacompuesta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TareaCompuesta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareasimpleTareacompuesta, {
            title: 'NewTareasimpleTareacompuestaInTareaCompuesta',
            exclude: ['id'],
            optional: ['tareaCompuestaId']
          }),
        },
      },
    }) tareasimpleTareacompuesta: Omit<TareasimpleTareacompuesta, 'id'>,
  ): Promise<TareasimpleTareacompuesta> {
    return this.tareaCompuestaRepository.tareasimpleTareacompuestas(id).create(tareasimpleTareacompuesta);
  }

  @patch('/tarea-compuestas/{id}/tareasimple-tareacompuestas', {
    responses: {
      '200': {
        description: 'TareaCompuesta.TareasimpleTareacompuesta PATCH success count',
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
    return this.tareaCompuestaRepository.tareasimpleTareacompuestas(id).patch(tareasimpleTareacompuesta, where);
  }

  @del('/tarea-compuestas/{id}/tareasimple-tareacompuestas', {
    responses: {
      '200': {
        description: 'TareaCompuesta.TareasimpleTareacompuesta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TareasimpleTareacompuesta)) where?: Where<TareasimpleTareacompuesta>,
  ): Promise<Count> {
    return this.tareaCompuestaRepository.tareasimpleTareacompuestas(id).delete(where);
  }
}
