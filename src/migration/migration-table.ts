import { Migration, StatusEnum } from './migration';
const { Table } = require('console-table-printer');

export const migrationTable = (m: Migration[]) => {
	const p = new Table();
	m.forEach((migration) => {
		const color = { color: '' };
		if (migration.status === StatusEnum.EXECUTED) {
			color.color = 'green';
		} else {
			color.color = 'yellow';
		}

		p.addRow(
			{
				name: migration.name,
				timestamp: migration.timestamp,
				status: migration.status,
				executedAt: migration.executedAt ? migration.executedAt.toString() : '',
			},
			color
		);
	});
	p.printTable();
};
