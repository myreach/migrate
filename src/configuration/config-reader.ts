import { pathExists } from "fs-extra";
import { resolve } from "path";
import { MigrationsConfig } from "./migrations-config.interface";

/**
 * Connection Options Reader is responsible of reading the options found in root
 */
export class ConfigReader {
  constructor() {}

  async load(filepath = "migrate-config.js"): Promise<MigrationsConfig> {
    let options: MigrationsConfig;

    const path = resolve(".", filepath);

    if (await pathExists(path)) {
      options = await import(path);
    } else {
      throw new Error(`Path does not exist: ${path}`);
    }

    await this.checkOptions(options);

    return options;
  }

  async checkOptions(config: MigrationsConfig) {
    if (!(await config.elasticSearchClient.ping())) {
      throw new Error("Cannot ping to elastic search node");
    }

    if (!config.options.indexName) {
      throw new Error("Index Name not defined");
    }

    if (!config.options.filter) {
      throw new Error("Filter for migrations filename not defined");
    }

    if (!config.options.root) {
      throw new Error("Root path not defined");
    }
  }
}
