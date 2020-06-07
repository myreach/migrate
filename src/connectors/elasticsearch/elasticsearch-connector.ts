/* eslint-disable no-useless-catch */
import {ApiResponse, Client} from '@elastic/elasticsearch';
import {MigrationWriteDTO} from '../../dto/migration-write';
import {MigrationReadDTO} from '../../dto/migration-read';
import {mappings} from './mappings';
import {ConnectorInterface} from '../connector-interface';
import {SearchResponse} from './search-response';

export class ElasticSearchConnector implements ConnectorInterface {
  constructor(private indexName: string, private client: Client) {}

  public create = async (migration: MigrationWriteDTO): Promise<void> => {
    await this.checkIndexExist();
    try {
      await this.client.create({
        index: this.indexName,
        id: migration.id,
        body: {
          executedAt: new Date(),
        },
      });
    } catch (err) {
      throw err;
    }
  };

  public delete = async (id: string): Promise<void> => {
    await this.checkIndexExist();
    try {
      await this.client.delete({
        index: this.indexName,
        id,
      });
    } catch (err) {
      throw err;
    }
  };

  public read = async (): Promise<MigrationReadDTO[]> => {
    await this.checkIndexExist();

    const migrations: ApiResponse<SearchResponse<
      MigrationReadDTO
    >> = await this.client.search({
      index: this.indexName,
    });

    return migrations.body.hits.hits.map(migration => ({
      id: migration._id,
      executedAt: migration._source.executedAt,
    }));
  };

  public clean = async () => {
    await this.client.indices.delete({
      index: this.indexName,
    });
  };

  private checkIndexExist = async () => {
    const indexExists = (
      await this.client.indices.exists({
        index: this.indexName,
      })
    ).body;
    if (!indexExists) {
      await this.createIndex();
    }
  };

  private createIndex = async () => {
    return this.client.indices.create({
      index: this.indexName,
      body: mappings,
    });
  };
}
