import { Client } from "@elastic/elasticsearch";
import { Transaction } from "neo4j-driver";
import { MigrationWriteDTO } from "../../dto/migration-write";
import { MigrationReadDTO } from "../../dto/migration-read";
import { ConnectorInterface } from "../connector-interface";
import { Neo4jQueries } from "./neo4j-queries";

export class Neo4jConnector implements ConnectorInterface {
  constructor(
    private client: Transaction,
    private queryBuilder: Neo4jQueries
  ) {}

  async create(migration: MigrationWriteDTO): Promise<void> {
    const query = this.queryBuilder.create(migration);
    await this.client.run(query);
  }

  async delete(id: string): Promise<void> {}

  async read(): Promise<MigrationReadDTO[]> {
    const query = this.queryBuilder.get();
    const result = await this.client.run(query);
    return result.records.map((value, index) => ({
      name: value.get("name"),
      id: value.get("id"),
      timestamp: value.get("timestamp"),
      executedAt: value.get("executedAt")
    }));
  }

  async clean(): Promise<void> {
    const query = this.queryBuilder.clean();
    const result = await this.client.run(query);
  }
}
