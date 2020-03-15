import { ApiResponse, Client } from "@elastic/elasticsearch";
import { MigrationWriteDTO } from "../../dto/migration-write";
import { MigrationReadDTO } from "../../dto/migration-read";
import { mappings } from "./mappings";
import { ConnectorInterface } from "../connector-interface";
import { SearchResponse } from "./search-response";

export class ElasticSearchConnector implements ConnectorInterface {
  constructor(private indexName: string, private client: Client) {}

  async create(migration: MigrationWriteDTO): Promise<void> {
    await this.checkIndexExist();
    try {
      await this.client.create({
        index: this.indexName,
        id: migration.id,
        body: {
          name: migration.name,
          timestamp: migration.timestamp,
          executedAt: new Date()
        }
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    await this.checkIndexExist();
    try {
      await this.client.delete({
        index: this.indexName,
        id
      });
    } catch (err) {
      throw err;
    }
  }

  async read(): Promise<MigrationReadDTO[]> {
    await this.checkIndexExist();

    const migrations: ApiResponse<SearchResponse<
      MigrationReadDTO
    >> = await this.client.search({
      index: this.indexName
    });

    return migrations.body.hits.hits.map(migration => ({
      name: migration._source.name,
      id: migration._id,
      timestamp: migration._source.timestamp,
      executedAt: migration._source.executedAt
    }));
  }

  async clean(): Promise<void> {
    await this.client.indices.delete({
      index: this.indexName
    });
  }

  private async checkIndexExist() {
    const indexExists = (
      await this.client.indices.exists({
        index: this.indexName
      })
    ).body;
    if (!indexExists) {
      await this.createIndex();
    }
  }

  private async createIndex() {
    return this.client.indices.create({
      index: this.indexName,
      body: mappings
    });
  }
}
