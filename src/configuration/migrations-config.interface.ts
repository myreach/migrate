import {ConnectionConfig} from './connection-config';

export interface MigrationsOptions {
  /*
	Path to search the migrations
	 */
  root: string;
  /**
   * Filter to apply migrations
   */
  filter: string | RegExp;

  /**
   * Index name to access executed migrations
   */
  indexName: string;
}

export interface MigrationsConfig {
  connections: {[key: string]: ConnectionConfig};
  /**
   * Options of the migrations
   */
  options: MigrationsOptions;
}
