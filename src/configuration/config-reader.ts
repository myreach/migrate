import {pathExists} from 'fs-extra';
import {resolve} from 'path';
import {MigrationsConfig} from './migrations-config.interface';

/**
 * Connection Options Reader is responsible of reading the options found in root
 */
export class ConfigReader {
  constructor(private configurationFilePath = 'migrate-config.js') {}

  public load = async (): Promise<MigrationsConfig> => {
    let options: MigrationsConfig;

    const path = resolve('.', this.configurationFilePath);

    if (await pathExists(path)) {
      options = await import(path);
    } else {
      throw new Error(`Configuration file does not exist: ${path}`);
    }

    await this.checkOptions(options);

    return options;
  };

  public checkOptions = (config: MigrationsConfig) => {
    // TODO: separate concern of checking connection from config
    // if (!(await config.elasticSearchClient.ping())) {
    //   throw new Error("Cannot ping to elastic search node");
    // }

    if (!config.options.indexName) {
      throw new Error('Index Name not defined');
    }

    if (!config.options.filter) {
      throw new Error('Filter for migrations filename not defined');
    }

    if (!config.options.root) {
      throw new Error('Root path not defined');
    }
  };
}
