import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CaTareas,
  Meta,
} from '../models';
import {CaTareasRepository} from '../repositories';

export class CaTareasMetaController {
  constructor(
    @repository(CaTareasRepository)
    public caTareasRepository: CaTareasRepository,
  ) { }

  @get('/ca-tareas/{id}/meta', {
    responses: {
      '200': {
        description: 'Meta belonging to CaTareas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Meta),
          },
        },
      },
    },
  })
  async getMeta(
    @param.path.number('id') id: typeof CaTareas.prototype.id,
  ): Promise<Meta> {
    return this.caTareasRepository.meta(id);
  }
}
