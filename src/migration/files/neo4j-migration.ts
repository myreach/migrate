import {MigrationFileInterface} from './migration-file-interface';
import {Transaction} from 'neo4j-driver';

export abstract class Neo4jMigration
  implements MigrationFileInterface<Transaction> {
  abstract down: (client: Transaction) => Promise<void>;
  abstract name: string;
  abstract timestamp: number;
  abstract up: (client: Transaction) => Promise<void>;
}
