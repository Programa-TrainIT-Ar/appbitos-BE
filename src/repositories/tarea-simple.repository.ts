import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TareaSimple, TareaSimpleRelations} from '../models';


export class TareaSimpleRepository extends DefaultCrudRepository<
  TareaSimple,
  typeof TareaSimple.prototype.id,
  TareaSimpleRelations
> {

  

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(TareaSimple, dataSource);
  }
}
