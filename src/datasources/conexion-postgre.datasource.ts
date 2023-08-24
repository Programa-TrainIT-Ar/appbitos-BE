import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'conexion_postgre',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'trainit',
  password: '',
  database: 'trainint_db'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConexionPostgreDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'conexion_postgre';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.conexion_postgre', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
