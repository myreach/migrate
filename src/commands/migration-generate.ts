import {Command} from 'clipanion';
import {ConfigReader} from '../configuration/config-reader';
import {MigrationTypes} from '../generate/migration-types';
import {generate} from '../generate';

export class MigrationGenerate extends Command {
  static usage = Command.Usage({
    description: 'generate migration',
    details: 'generate migration template with the name specified',
    examples: [['Generate Basic Migration', 'es-migration generate document']],
  });

  @Command.String('-c,--config')
  public configPath?: string;

  @Command.String({
    required: true,
  })
  public type!: MigrationTypes;

  @Command.String({
    required: true,
  })
  public name!: string;

  @Command.Path('generate')
  async execute() {
    const configReader = new ConfigReader(this.configPath);
    const config = await configReader.load();
    const path = await generate({
      name: this.name,
      type: this.type,
      config,
      timestamp: Date.now(),
    });
    this.context.stdout.write(
      `Migration created successfully located in ${path}\n`
    );
  }
}
