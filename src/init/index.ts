import {pathExists, writeFile} from 'fs-extra';
import {makeConfigurationTemplate} from '../configuration/configuration-template';

interface InitOptions {
  path?: string;
  elasticSearchUrl?: string;
  root?: string;
}

export const init = async ({
  path = '',
  elasticSearchUrl = '',
  root = '',
}: InitOptions) => {
  if (await pathExists(path)) {
    throw new Error('File exists!');
  }
  await writeFile(
    path,
    makeConfigurationTemplate({
      url: elasticSearchUrl,
      root,
      fileFilter: '/.*.es-migration.ts$/',
    })
  );
};
