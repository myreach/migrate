import { MigrationReader } from "./migration-reader";
import { MigrationRunner } from "./migration-runner";
import { Migration, StatusEnum } from "./migration";

export class MigrationComparer {
  constructor(
    public migrationRemote: MigrationRunner,
    public migrationReader: MigrationReader
  ) {}

  async getAll() {
    // We make a map to search by id
    const migrationsRaw = await this.migrationReader.getMigrations();
    const migrations = migrationsRaw.reduce(
      (acc, migration) => acc.set(migration.id, migration),
      new Map()
    );

    const remoteMigrationsRaw = await this.migrationRemote.get();
    const remoteMigrations = remoteMigrationsRaw.reduce(
      (acc, migration) => acc.set(migration.id, migration),
      new Map()
    );

    // Get all ids to
    const allIds = new Set(
      [...migrationsRaw, ...remoteMigrationsRaw].map(migration => migration.id)
    );

    const migrationStatus: Migration[] = [];

    allIds.forEach(id => {
      const isPending = migrations.has(id);
      const isExecuted = remoteMigrations.has(id);
      let migration;
      if (isPending && isExecuted) {
        migration = migrations.get(id);
        const remoteMigration = remoteMigrations.get(id);
        migration.executedAt = remoteMigration.executedAt;
        migration.status = StatusEnum.EXECUTED;
      } else if (isPending && !isExecuted) {
        migration = migrations.get(id);
        migration.status = StatusEnum.PENDING;
      } else if (!isPending && isExecuted) {
        migration = remoteMigrations.get(id);
        migration.status = StatusEnum.EXECUTED;
      }
      migrationStatus.push(migration);
    });

    return migrationStatus;
  }
}
