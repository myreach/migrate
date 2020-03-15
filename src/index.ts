import { Cli } from 'clipanion';

import { bin, version } from '../package.json';

import * as commands from './commands/index';

const cli = new Cli({
	binaryLabel: 'Migrations',
	binaryName: Object.keys(bin)[0],
	binaryVersion: version,
});

for (const command of Object.keys(commands)) {
	// @ts-ignore
	cli.register(commands[command]);
}

cli.runExit(process.argv.slice(2), {
	stdin: process.stdin,
	stdout: process.stdout,
	stderr: process.stderr,
});
