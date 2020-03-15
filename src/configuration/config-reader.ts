import { EsMigrationsConfig } from './es-migrations-config.interface';

import { pathExists } from 'fs-extra';
import { resolve } from 'path';

/**
 * Connection Options Reader is responsible of reading the options found in root
 */
export class ConfigReader {
	constructor() {}

	static async load(filepath = 'migrate-config.js'): Promise<EsMigrationsConfig> {
		let options: EsMigrationsConfig;

		const path = resolve('.', filepath);

		if (await pathExists(path)) {
			options = await import(path);
		} else {
			throw new Error(`Path does not exist: ${path}`);
		}

		await this.checkOptions(options);

		return options;
	}

	static async checkOptions(config: EsMigrationsConfig) {
		if (!(await config.elasticSearchClient.ping())) {
			throw new Error('Cannot ping to elastic search node');
		}

		if (!config.options.indexName) {
			throw new Error('Index Name not defined');
		}

		if (!config.options.filter) {
			throw new Error('Filter for migrations filename not defined');
		}

		if (!config.options.root) {
			throw new Error('Root path not defined');
		}
	}
}
