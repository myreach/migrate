import { promises as fs } from 'fs';
const path = require('path');

export const walk = async (dir: string) => {
	let files = await fs.readdir(dir);
	files = await Promise.all(
		files.map(async (file: string) => {
			const filePath = path.join(dir, file);
			const stats = await fs.stat(filePath);
			if (stats.isDirectory()) return walk(filePath);
			else if (stats.isFile()) return filePath;
		})
	);

	return files.reduce((acc: string[], curr) => acc.concat(curr), []);
};
