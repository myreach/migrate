import {MigrationTemplate} from '../../generate/migration-template';

export class Neo4jTemplate implements MigrationTemplate {
  constructor(
    public name: string,
    public timestamp = Date.now(),
    public className: string
  ) {}
  template = () => `import { Neo4jMigration } from '@myreach/migrate/src/migration/types/neo4j-migration';
import { Transaction } from 'neo4j-driver';

export default class ${this.className} extends Neo4jMigration {
	name = '${this.name}';
	timestamp = ${this.timestamp};

	public async up(transaction: Transaction) {}

	public async down(transaction: Transaction) {}
}`;
}
