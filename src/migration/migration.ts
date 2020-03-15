import { MigrationFileInterface } from './migration-file-interface';

export enum StatusEnum {
	PENDING = 'PENDING',
	EXECUTED = 'EXECUTED',
}

export class Migration {
	id: string;
	status?: StatusEnum;
	executedAt?: Date;

	constructor(
		public timestamp: number,
		public name: string,
		public instance?: MigrationFileInterface,
		executedAt?: string
	) {
		this.id = timestamp.toString(10) + '-' + name;
		if (executedAt) {
			this.executedAt = new Date(executedAt);
		}
	}
}
