import { Command } from "clipanion";
import { ConfigReader } from "../configuration/config-reader";
import { MigrationRunner } from "../migration/migration-runner";
import { MigrationComparer } from "../migration/migration-comparer";
import { MigrationReader } from "../migration/migration-reader";
import { migrationTable } from "../migration/migration-table";

export class MigrationList extends Command {
  static usage = Command.Usage({
    description: "list all migrations",
    details: "details",
    examples: [["msg", "command"]]
  });

  @Command.String("--config")
  public configPath?: string;

  @Command.Path("list")
  async execute() {
    const config = await ConfigReader.load(this.configPath);
    const elastic = new MigrationRunner(config, this.context.stdout);
    const migrationReader = new MigrationReader(
      config.options.root,
      config.options.filter
    );
    const migrationComparer = new MigrationComparer(elastic, migrationReader);
    const migrations = await migrationComparer.getAll();
    if (migrations.length > 0) {
      const sortedMigrations = migrations.sort(
        (a, b) => a.timestamp - b.timestamp
      );
      migrationTable(sortedMigrations);
    } else {
      this.context.stdout.write("There is no migrations.");
    }
  }
}
