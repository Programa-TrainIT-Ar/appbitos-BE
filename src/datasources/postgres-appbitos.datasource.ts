import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'postgres_appbitos',
  connector: 'postgresql',
  url: 'postgres://admin:root@localhost/appbitos',
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'root',
  database: 'appbitos',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresAppbitosDatasource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postgres_appbitos';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgres_appbitos', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
