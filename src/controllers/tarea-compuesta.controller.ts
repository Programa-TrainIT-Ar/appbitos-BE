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
  HttpErrors,
} from '@loopback/rest';
import {TareaCompuesta} from '../models';
import {MetaRepository, TareaCompuestaRepository} from '../repositories';

export class TareaCompuestaController {

  constructor(
    @repository(TareaCompuestaRepository)
    public tareaCompuestaRepository : TareaCompuestaRepository,
    @repository(MetaRepository)
    public metaRepository : MetaRepository,
  ) {}

  @post('/tarea-compuestas')
  @response(200, {
    description: 'TareaCompuesta model instance',
    content: {'application/json': {schema: getModelSchemaRef(TareaCompuesta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareaCompuesta, {
            title: 'NewTareaCompuesta',
            exclude: ['id'],
          }),
        },
      },
    })
    tareaCompuesta: Omit<TareaCompuesta, 'id'>,
  ): Promise<object> {
    let usuario =  await this.metaRepository.findOne({
      where:{
        id: tareaCompuesta.metaId
      }
    })
    /*console.log(this.metaRepository.hola);*/
    if (usuario){         
    return this.tareaCompuestaRepository.create(tareaCompuesta);
    } 
    else {
      return new HttpErrors[401]("No existe el usuario");
    }

  }

  @get('/tarea-compuestas/count')
  @response(200, {
    description: 'TareaCompuesta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TareaCompuesta) where?: Where<TareaCompuesta>,
  ): Promise<Count> {
    return this.tareaCompuestaRepository.count(where);
  }

  @get('/tarea-compuestas')
  @response(200, {
    description: 'Array of TareaCompuesta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TareaCompuesta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TareaCompuesta) filter?: Filter<TareaCompuesta>,
  ): Promise<TareaCompuesta[]> {
    return this.tareaCompuestaRepository.find(filter);
  }

  @patch('/tarea-compuestas')
  @response(200, {
    description: 'TareaCompuesta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareaCompuesta, {partial: true}),
        },
      },
    })
    tareaCompuesta: TareaCompuesta,
    @param.where(TareaCompuesta) where?: Where<TareaCompuesta>,
  ): Promise<Count> {
    return this.tareaCompuestaRepository.updateAll(tareaCompuesta, where);
  }

  @get('/tarea-compuestas/{id}')
  @response(200, {
    description: 'TareaCompuesta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TareaCompuesta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TareaCompuesta, {exclude: 'where'}) filter?: FilterExcludingWhere<TareaCompuesta>
  ): Promise<TareaCompuesta> {
    return this.tareaCompuestaRepository.findById(id, filter);
  }

  @patch('/tarea-compuestas/{id}')
  @response(204, {
    description: 'TareaCompuesta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TareaCompuesta, {partial: true}),
        },
      },
    })
    tareaCompuesta: TareaCompuesta,
  ): Promise<void> {
    await this.tareaCompuestaRepository.updateById(id, tareaCompuesta);
  }

  @put('/tarea-compuestas/{id}')
  @response(204, {
    description: 'TareaCompuesta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tareaCompuesta: TareaCompuesta,
  ): Promise<void> {
    await this.tareaCompuestaRepository.replaceById(id, tareaCompuesta);
  }

  @del('/tarea-compuestas/{id}')
  @response(204, {
    description: 'TareaCompuesta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tareaCompuestaRepository.deleteById(id);
  }
}
