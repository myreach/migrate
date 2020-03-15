import { MigrationWriteDTO } from "../../dto/migration-write";

export const createMigration = (
  labelName: string,
  migration: MigrationWriteDTO
): string => `CREATE (n:${labelName}: {
        name:       "${migration.name}",
        timestamp:  "${migration.timestamp}",
        id:         "${migration.id}",
        executedAt: "${migration.executedAt}"
        })`;
