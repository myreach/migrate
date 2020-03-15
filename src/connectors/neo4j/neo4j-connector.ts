import { Client } from "@elastic/elasticsearch";
import { Transaction } from "neo4j-driver";
import { MigrationWriteDTO } from "../../dto/migration-write";
import { MigrationReadDTO } from "../../dto/migration-read";
import { ConnectorInterface } from "../connector-interface";
import { createMigration } from "./create-migration.query";
import { getMigrations } from "./get-migrations.query";

export class Neo4jConnector implements ConnectorInterface {
  constructor(private labelName: string, private client: Transaction) {}

  async create(migration: MigrationWriteDTO): Promise<void> {
    const query = createMigration(this.labelName, migration);
    await this.client.run(query);
  }

  async delete(id: string): Promise<void> {}

  async read(): Promise<MigrationReadDTO[]> {
    const query = getMigrations(this.labelName);
    const result = await this.client.run(query);
    return result.records.map((value, index) => ({
      name: value.get("name"),
      id: value.get("id"),
      timestamp: value.get("timestamp"),
      executedAt: value.get("executedAt")
    }));
  }

  async clean(): Promise<void> {}

  private async checkIndexExist() {}

  private async createIndex() {}
}
