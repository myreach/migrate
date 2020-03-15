import { Command } from 'clipanion';
import { ConfigReader } from '../configuration/config-reader';
import { generateMigration } from '../migration/generate-migration';

export class MigrationGenerate extends Command {
	static usage = Command.Usage({
		description: `generate migration`,
		details: `generate migration template with the name specified`,
		examples: [[`Generate Basic Migration`, `es-migration generate document`]],
	});

	@Command.String('-c,--config')
	public configPath?: string;

	@Command.String({
		required: true,
	})
	public name!: string;

	@Command.Path(`generate`)
	async execute() {
		const config = await ConfigReader.load(this.configPath);
		try {
			const path = await generateMigration(config.options.root, this.name);
			this.context.stdout.write(`Migration created successfully located in ${path}\n`);
		} catch (err) {
			throw err;
		}
	}
}
