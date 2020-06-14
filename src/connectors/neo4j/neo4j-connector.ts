import {Transaction} from 'neo4j-driver';
import {MigrationWriteDTO} from '../../dto/migration-write';
import {MigrationReadDTO} from '../../dto/migration-read';
import {ConnectorInterface} from '../connector-interface';
import {Neo4jQueries} from './neo4j-queries';

export class Neo4jConnector implements ConnectorInterface {
  private queryBuilder: Neo4jQueries;
  constructor(private client: Transaction, private indexName = 'migration') {
    this.queryBuilder = new Neo4jQueries(this.indexName);
  }
  create = async (migration: MigrationWriteDTO): Promise<void> => {
    const query = this.queryBuilder.create(migration);
    await this.client.run(query);
  };

  delete = async (id: string): Promise<void> => {
    // TODO:
  };

  read = async (): Promise<MigrationReadDTO[]> => {
    const query = this.queryBuilder.get();
    const result = await this.client.run(query);
    return result.records.map(value => ({
      id: value.get('id'),
      executedAt: value.get('executedAt'),
    }));
  };

  clean = async (): Promise<void> => {
    const query = this.queryBuilder.clean();
    await this.client.run(query);
  };
}
