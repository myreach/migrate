export const makeTemplate = (name: string, timestamp: number): string => `
import { MigrationInterface } from '@reach/es-migrate/src/migration/migration-interface';
import { Client } from '@elastic/elasticsearch';

export default class ${name + timestamp} implements MigrationInterface {
	name = '${name}';
	timestamp = ${timestamp};

	public async up(client: Client) {}

	public async down(client: Client) {}
}

`;
