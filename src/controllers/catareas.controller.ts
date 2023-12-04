import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CaTareas} from '../models';
import {CaTareasRepository} from '../repositories';

export class CatareasController {
  constructor(
    @repository(CaTareasRepository)
    public caTareasRepository : CaTareasRepository,
  ) {}

  @post('/ca-tareas')
  @response(200, {
    description: 'CaTareas model instance',
    content: {'application/json': {schema: getModelSchemaRef(CaTareas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaTareas, {
            title: 'NewCaTareas',
            exclude: ['id'],
          }),
        },
      },
    })
    caTareas: Omit<CaTareas, 'id'>,
  ): Promise<CaTareas> {
    return this.caTareasRepository.create(caTareas);
  }

  @get('/ca-tareas/count')
  @response(200, {
    description: 'CaTareas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CaTareas) where?: Where<CaTareas>,
  ): Promise<Count> {
    return this.caTareasRepository.count(where);
  }

  @get('/ca-tareas')
  @response(200, {
    description: 'Array of CaTareas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CaTareas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CaTareas) filter?: Filter<CaTareas>,
  ): Promise<CaTareas[]> {
    return this.caTareasRepository.find(filter);
  }

  @patch('/ca-tareas')
  @response(200, {
    description: 'CaTareas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaTareas, {partial: true}),
        },
      },
    })
    caTareas: CaTareas,
    @param.where(CaTareas) where?: Where<CaTareas>,
  ): Promise<Count> {
    return this.caTareasRepository.updateAll(caTareas, where);
  }

  @get('/ca-tareas/{id}')
  @response(200, {
    description: 'CaTareas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CaTareas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CaTareas, {exclude: 'where'}) filter?: FilterExcludingWhere<CaTareas>
  ): Promise<CaTareas> {
    return this.caTareasRepository.findById(id, filter);
  }

  @patch('/ca-tareas/{id}')
  @response(204, {
    description: 'CaTareas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaTareas, {partial: true}),
        },
      },
    })
    caTareas: CaTareas,
  ): Promise<void> {
    await this.caTareasRepository.updateById(id, caTareas);
  }

  @put('/ca-tareas/{id}')
  @response(204, {
    description: 'CaTareas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() caTareas: CaTareas,
  ): Promise<void> {
    await this.caTareasRepository.replaceById(id, caTareas);
  }

  @del('/ca-tareas/{id}')
  @response(204, {
    description: 'CaTareas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.caTareasRepository.deleteById(id);
  }
}
