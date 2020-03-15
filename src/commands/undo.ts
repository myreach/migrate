import { Command } from "clipanion";
import { MigrationReader } from "../migration/migration-reader";
import { ConfigReader } from "../configuration/config-reader";
import { MigrationComparer } from "../migration/migration-comparer";
import { MigrationRunner } from "../migration/migration-runner";
import { StatusEnum } from "../migration/migration";

const cliSelect = require("cli-select");
const chalk = require("chalk");

export class UndoCommand extends Command {
  static usage = Command.Usage({
    description: "undo migration",
    details: "Undo last executed migration (with the highest timestamp",
    examples: [["Undo last migration", "es-migration undo"]]
  });

  @Command.String("--config")
  public configPath?: string;

  @Command.Path("undo")
  async execute() {
    const config = await ConfigReader.load(this.configPath);
    const elastic = new MigrationRunner(config, this.context.stdout);
    const migrationReader = new MigrationReader(
      config.options.root,
      config.options.filter
    );
    const migrationComparer = new MigrationComparer(elastic, migrationReader);
    const migrationsUnsorted = await migrationComparer.getAll();
    const migration = migrationsUnsorted
      .sort((a, b) => b.timestamp - a.timestamp)
      .filter(migration => migration.status === StatusEnum.EXECUTED);

    console.log("Please select the migration to undo:");
    const selected = await cliSelect({
      values: migration.map(m => m.id),
      indentation: 2,
      cleanup: true,
      valueRenderer: (value: any, selected: any) => {
        if (selected) {
          return chalk.green(chalk.underline(value));
        }

        return value;
      }
    });

    console.log(selected);

    // We get the first element in the array
    const migrationToUndo = migration[selected.id];

    if (!migrationToUndo) {
      console.log("Cannot find migration.");
    }

    console.log(`The migration to undo is: ${migrationToUndo.id}.`);
    const validate = await cliSelect({
      values: ["yes", "no"],
      indentation: 2,
      cleanup: true,
      valueRenderer: (value: any, selected: any) => {
        if (selected) {
          return chalk.green(chalk.underline(value));
        }

        return value;
      }
    });

    if (validate.value === "yes") {
      await elastic.delete(migrationToUndo);
    }
  }
}
