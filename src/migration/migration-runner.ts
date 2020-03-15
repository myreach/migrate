import { EsMigrationsConfig } from '../configuration/es-migrations-config.interface';
import { Client } from '@elastic/elasticsearch';
import { Migration } from './migration';
import { Writable } from 'stream';
import * as chalk from 'chalk';
import {ConnectorInterface} from "../connectors/connector-interface";

export class MigrationRunner {
	private client: Client;
	private indexName: string;
	constructor(config: EsMigrationsConfig, private stdout: Writable, private db: ConnectorInterface) {
		this.client = config.elasticSearchClient;
		this.indexName = config.options.indexName;
	}

	protected printError(s: string) {
		this.stdout.write(chalk.red(s));
	}

	protected printSuccess(s: string) {
		this.stdout.write(chalk.green(s));
	}

	protected print(s: string) {
		this.stdout.write(chalk.blue(s));
	}

	async get(): Promise<Migration[]> {

	}

	async add(migration: Migration) {


	}

	async delete(migration: Migration) {
}
	}

}
