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
import {Meta} from '../models';
import {MetaRepository, UsuarioRepository} from '../repositories';

export class MetaController {

  constructor(
    @repository(MetaRepository)
    public metaRepository : MetaRepository,
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository
  ) {}

  @post('/metas')
  @response(200, {
    description: 'Meta model instance',
    content: {'application/json': {schema: getModelSchemaRef(Meta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meta, {
            title: 'NewMeta',
            exclude: ['id'],
          }),
        },
      },
    })
    meta: Omit<Meta, 'id'>,
  ): Promise<object> {
    let usuario =  await this.usuarioRepository.findOne({
      where:{
        id: meta.usuarioId
      }
    })
    /*console.log(this.metaRepository.hola);*/
    if (usuario){
      return this.metaRepository.create(meta);
    } 
    else {
      return new HttpErrors[401]("No existe el usuario");
    }
   
  }

  @get('/metas/count')
  @response(200, {
    description: 'Meta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Meta) where?: Where<Meta>,
  ): Promise<Count> {
    return this.metaRepository.count(where);
  }

  @get('/metas')
  @response(200, {
    description: 'Array of Meta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Meta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Meta) filter?: Filter<Meta>,
  ): Promise<Meta[]> {
    return this.metaRepository.find(filter);
  }

  @patch('/metas')
  @response(200, {
    description: 'Meta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meta, {partial: true}),
        },
      },
    })
    meta: Meta,
    @param.where(Meta) where?: Where<Meta>,
  ): Promise<Count> {
    return this.metaRepository.updateAll(meta, where);
  }

  @get('/metas/{id}')
  @response(200, {
    description: 'Meta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Meta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Meta, {exclude: 'where'}) filter?: FilterExcludingWhere<Meta>
  ): Promise<Meta> {
    return this.metaRepository.findById(id, filter);
  }

  @patch('/metas/{id}')
  @response(204, {
    description: 'Meta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meta, {partial: true}),
        },
      },
    })
    meta: Meta,
  ): Promise<void> {
    await this.metaRepository.updateById(id, meta);
  }

  @put('/metas/{id}')
  @response(204, {
    description: 'Meta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() meta: Meta,
  ): Promise<void> {
    await this.metaRepository.replaceById(id, meta);
  }

  @del('/metas/{id}')
  @response(204, {
    description: 'Meta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.metaRepository.deleteById(id);
  }

}
