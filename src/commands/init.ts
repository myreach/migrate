import { Command } from 'clipanion';
const rl = require('readline');
import { pathExists, writeFile } from 'fs-extra';
import { makeConfigurationTemplate } from '../templates/configuration-template';
import { resolve } from 'path';
import { readlinePromise } from '../utils/readline-promise';

export class InitCommand extends Command {
	static usage = Command.Usage({
		description: `Initialize configuration`,
		details: `The cli will ask some questions about the configuration through a new CLI experience.`,
		examples: [[`Initialize configuration`, `es-migration init`]],
	});

	@Command.Path(`init`)
	async execute() {
		let readline = rl.createInterface({
			input: process.stdin,
			output: process.stdout,
			terminal: true,
		});

		readline = readlinePromise(readline);
		let root = await readline.questionAsync(
			`Choose root path where the migrations will be placed: (default: . ): `
		);

		if (root === '') {
			root = '.';
		}

		// let fileFilter = await readline.questionAsync(
		// 	`Choose pattern to match migrations files: (default: *.es-migration.ts): `
		// );
		//
		// if (fileFilter === '') {
		// 	fileFilter = ;
		// }

		let url = await readline.questionAsync(
			`Choose elastic-search url: (default: http://localhost:9200): `
		);

		if (url === '') {
			url = 'http://localhost:9200';
		}

		const path = resolve('.', 'migrate-config.js');

		let writeToFile = true;
		if (await pathExists(path)) {
			const response = await readline.questionAsync(
				`Path already exists. Overwrite? [y/n]: `
			);
			writeToFile = response === 'y' || response === 'Y';
		}

		readline.close();

		if (writeToFile) {
			await writeFile(
				path,
				makeConfigurationTemplate({
					url,
					root,
					fileFilter: `/.*\.es-migration\.ts$/`,
				})
			);
		} else {
			this.context.stdout.write(`Aborting`);
		}
	}
}
