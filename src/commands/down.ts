import { Command } from "clipanion";
import { MigrationReader } from "../migration/migration-reader";
import { ConfigReader } from "../configuration/config-reader";
import { MigrationComparer } from "../migration/migration-comparer";
import { MigrationRunner } from "../migration/migration-runner";
import { StatusEnum } from "../migration/migration";

export class DownCommand extends Command {
  static usage = Command.Usage({
    description: "undo all migrations",
    details: "details",
    examples: [["msg", "command"]]
  });

  @Command.String("--config")
  configPath?: string;

  @Command.Path("down")
  async execute() {
    const config = await ConfigReader.load(this.configPath);
    const elastic = new MigrationRunner(config, this.context.stdout);
    const migrationReader = new MigrationReader(
      config.options.root,
      config.options.filter
    );
    const migrationComparer = new MigrationComparer(elastic, migrationReader);
    const migrations = await migrationComparer.getAll();

    const migrationsToBeExecuted = migrations
      .filter(migration => migration.status === StatusEnum.EXECUTED)
      .sort((a, b) => b.timestamp - a.timestamp);

    if (migrationsToBeExecuted.length <= 0) {
      this.context.stdout.write("There are no migrations to be executed.\n");
    } else {
      for (const migration of migrationsToBeExecuted) {
        await elastic.delete(migration);
      }
      await elastic.deleteIndex();
    }
  }
}
