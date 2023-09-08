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
  TareacompuestaLogro,
} from '../models';
import {TareaCompuestaRepository} from '../repositories';

export class TareaCompuestaTareacompuestaLogroController {
  constructor(
    @repository(TareaCompuestaRepository) protected tareaCompuestaRepository: TareaCompuestaRepository,
  ) { }

  @get('/tarea-compuestas/{id}/tareacompuesta-logroes', {
    responses: {
      '200': {
        description: 'Array of TareaCompuesta has many TareacompuestaLogro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TareacompuestaLogro)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TareacompuestaLogro>,
  ): Promise<TareacompuestaLogro[]> {
    return this.tareaCompuestaRepository.tareacompuestaLogroes(id).find(filter);
  }

  @post('/tarea-compuestas/{id}/tareacompuesta-logroes', {
    responses: {
      '200': {
        description: 'TareaCompuesta model instance',
        content: {'application/json': {schema: getModelSchemaRef(TareacompuestaLogro)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TareaCompuesta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareacompuestaLogro, {
            title: 'NewTareacompuestaLogroInTareaCompuesta',
            exclude: ['id'],
            optional: ['tareaCompuestaId']
          }),
        },
      },
    }) tareacompuestaLogro: Omit<TareacompuestaLogro, 'id'>,
  ): Promise<TareacompuestaLogro> {
    return this.tareaCompuestaRepository.tareacompuestaLogroes(id).create(tareacompuestaLogro);
  }

  @patch('/tarea-compuestas/{id}/tareacompuesta-logroes', {
    responses: {
      '200': {
        description: 'TareaCompuesta.TareacompuestaLogro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareacompuestaLogro, {partial: true}),
        },
      },
    })
    tareacompuestaLogro: Partial<TareacompuestaLogro>,
    @param.query.object('where', getWhereSchemaFor(TareacompuestaLogro)) where?: Where<TareacompuestaLogro>,
  ): Promise<Count> {
    return this.tareaCompuestaRepository.tareacompuestaLogroes(id).patch(tareacompuestaLogro, where);
  }

  @del('/tarea-compuestas/{id}/tareacompuesta-logroes', {
    responses: {
      '200': {
        description: 'TareaCompuesta.TareacompuestaLogro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TareacompuestaLogro)) where?: Where<TareacompuestaLogro>,
  ): Promise<Count> {
    return this.tareaCompuestaRepository.tareacompuestaLogroes(id).delete(where);
  }
}
