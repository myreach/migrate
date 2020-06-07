import {MigrationWriteDTO} from '../../dto/migration-write';

export class Neo4jQueries {
  constructor(private labelName = 'Migration') {}

  create = (migration: MigrationWriteDTO): string => `
    CREATE (n:${this.labelName}: {
        id:         "${migration.id}",
        executedAt: "${migration.executedAt}"
    })`;

  get = (): string => `MATCH (n:${this.labelName}) RETURN n`;

  clean = (): string => `MATCH (n:${this.labelName}) DETACH DELETE n`;

  deleteById = (id: string): string =>
    `MATCH (n:${this.labelName} {id:"${id}"}) DETACH DELETE n`;
}
