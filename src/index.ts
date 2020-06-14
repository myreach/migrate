import {Cli} from 'clipanion';
import * as commands from './commands/index';

const cli = new Cli({
  binaryLabel: 'Migrations',
  binaryName: Object.keys('migrate')[0],
  binaryVersion: '0.0.1',
});

cli.register(commands.MigrationList);
cli.register(commands.MigrationGenerate);

cli.runExit(process.argv.slice(2), {
  stdin: process.stdin,
  stdout: process.stdout,
  stderr: process.stderr,
});
