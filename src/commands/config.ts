import {Command} from 'clipanion';
import {ConfigReader} from '../configuration/config-reader';

export class ConfigCommand extends Command {
  static usage = Command.Usage({
    description: 'check config before running',
    details: 'details',
    examples: [['msg', 'command']],
  });

  @Command.String('--config')
  configPath?: string;

  @Command.Path('config')
  async execute() {
    this.context.stdout.write('config!\n');

    const configReader = new ConfigReader(this.configPath);

    const options = await configReader.load();

    this.context.stdout.write(JSON.stringify(options));
  }
}
