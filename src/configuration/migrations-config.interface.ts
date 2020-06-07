import {Client} from '@elastic/elasticsearch';
import {Driver} from 'neo4j-driver';

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
  /**
   * Instance of the client is going to be used with elastic
   */
  elasticSearchClient: () => Client;

  /**
   * Instance of the client is going to be used with neo4h
   */
  neo4jDriver: () => Driver;

  /**
   * Options of the migrations
   */
  options: MigrationsOptions;
}
