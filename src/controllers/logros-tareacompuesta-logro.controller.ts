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
  TareacompuestaLogro,
} from '../models';
import {LogrosRepository} from '../repositories';

export class LogrosTareacompuestaLogroController {
  constructor(
    @repository(LogrosRepository) protected logrosRepository: LogrosRepository,
  ) { }

  @get('/logros/{id}/tareacompuesta-logroes', {
    responses: {
      '200': {
        description: 'Array of Logros has many TareacompuestaLogro',
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
    return this.logrosRepository.tareacompuestaLogroes(id).find(filter);
  }

  @post('/logros/{id}/tareacompuesta-logroes', {
    responses: {
      '200': {
        description: 'Logros model instance',
        content: {'application/json': {schema: getModelSchemaRef(TareacompuestaLogro)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Logros.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareacompuestaLogro, {
            title: 'NewTareacompuestaLogroInLogros',
            exclude: ['id'],
            optional: ['logrosId']
          }),
        },
      },
    }) tareacompuestaLogro: Omit<TareacompuestaLogro, 'id'>,
  ): Promise<TareacompuestaLogro> {
    return this.logrosRepository.tareacompuestaLogroes(id).create(tareacompuestaLogro);
  }

  @patch('/logros/{id}/tareacompuesta-logroes', {
    responses: {
      '200': {
        description: 'Logros.TareacompuestaLogro PATCH success count',
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
    return this.logrosRepository.tareacompuestaLogroes(id).patch(tareacompuestaLogro, where);
  }

  @del('/logros/{id}/tareacompuesta-logroes', {
    responses: {
      '200': {
        description: 'Logros.TareacompuestaLogro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TareacompuestaLogro)) where?: Where<TareacompuestaLogro>,
  ): Promise<Count> {
    return this.logrosRepository.tareacompuestaLogroes(id).delete(where);
  }
}
