import { Command } from "clipanion";
import { MigrationReader } from "../migration/migration-reader";
import { ConfigReader } from "../configuration/config-reader";
import { MigrationComparer } from "../migration/migration-comparer";
import { MigrationRunner } from "../migration/migration-runner";
import { StatusEnum } from "../migration/migration";

export class UpCommand extends Command {
  static usage = Command.Usage({
    description: "update to last migration",
    details: "details",
    examples: [["msg", "command"]]
  });

  @Command.String("--config")
  public configPath?: string;

  @Command.Path("up")
  async execute() {
    const config = await ConfigReader.load(this.configPath);
    const elastic = new MigrationRunner(config, this.context.stdout);
    const migrationReader = new MigrationReader(
      config.options.root,
      config.options.filter
    );
    const migrationComparer = new MigrationComparer(elastic, migrationReader);
    const migrationsUnsorted = await migrationComparer.getAll();
    const migrations = migrationsUnsorted.sort(
      (a, b) => a.timestamp - b.timestamp
    );

    const migrationsToBeExecuted = migrations
      .filter(migration => migration.status === StatusEnum.PENDING)
      .sort((a, b) => a.timestamp - b.timestamp);

    if (migrationsToBeExecuted.length <= 0) {
      this.context.stdout.write("There are no migrations to be executed.\n");
    } else {
      for (const migration of migrationsToBeExecuted) {
        await elastic.add(migration);
      }
    }
  }
}
