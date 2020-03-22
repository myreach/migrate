import { ConfigReader } from "../configuration/config-reader";
import { MigrationTypes } from "./migration-types";
import { ElasticTemplate } from "./elastic-template";
import { MigrationTemplate } from "./migration-template";
import { Neo4jTemplate } from "./neo4j-template";
import { resolve } from "path";
import { paramCase, pascalCase } from "change-case";
import { writeFile } from "fs-extra";
import { TemplateNotFound } from "./template-not-found";

interface GenerateOptionsInterface {
  type: MigrationTypes;
  configPath?: string;
  name: string;
  timestamp?: number;
}

const nameTemplate = (name: string, timestamp = Date.now()): string => {
  return `${timestamp}-${paramCase(name)}.migrations.ts`;
};

export const generate = async ({
  type,
  configPath,
  name,
  timestamp = Date.now()
}: GenerateOptionsInterface) => {
  const configReader = new ConfigReader(configPath);
  const config = await configReader.load();

  let migration: MigrationTemplate;

  if (!name) {
    throw new Error("Name of the migration not defined");
  }

  const className = pascalCase(name) + timestamp;
  const fileName = nameTemplate(name, timestamp);

  if (type == "es") {
    migration = new ElasticTemplate(name, timestamp, className);
  } else if (type == "neo4j") {
    migration = new Neo4jTemplate(name, timestamp, className);
  } else {
    throw new TemplateNotFound(type);
  }

  const filepath = resolve(config.options.root, fileName);

  await writeFile(filepath, migration.template());
};

(async () => {
  await generate({
    name: "gon",
    type: "es"
  });
})();
