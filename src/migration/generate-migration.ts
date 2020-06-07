import {writeFile} from 'fs-extra';
import {resolve} from 'path';
import {makeTemplate} from '../templates/migration-template';
import {PascalCase} from '../utils/pascal-case';
import {toKebabCase} from '../utils/kebab-case';

export const generateMigration = async (path: string, name: string) => {
  const timestamp = Date.now();
  const template = makeTemplate(PascalCase(name), timestamp);
  const filepath = resolve(
    path,
    `${timestamp}-${toKebabCase(name)}.es-migration.ts`
  );

  await writeFile(filepath, template);
  return filepath;
};
