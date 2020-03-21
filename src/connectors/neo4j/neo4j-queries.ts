import { MigrationWriteDTO } from "../../dto/migration-write";

export class Neo4jQueries {
  constructor(private labelName = "Migrations") {}

  create = (migration: MigrationWriteDTO): string => `
    CREATE (n:${this.labelName}: {
        name:       "${migration.name}",
        timestamp:  "${migration.timestamp}",
        id:         "${migration.id}",
        executedAt: "${migration.executedAt}"
    })`;

  get = (): string => `MATCH (n:${this.labelName}) RETURN n`;

  clean = (): string => `MATCH (n:${this.labelName}) DETACH DELETE n`;
}
