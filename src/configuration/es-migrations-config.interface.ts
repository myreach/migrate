import { Client } from '@elastic/elasticsearch';

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

export interface EsMigrationsConfig {
	/**
	 * Instance of the client is going to be used
	 */
	elasticSearchClient: Client;

	/**
	 * Options of the migrations
	 */
	options: MigrationsOptions;
}
