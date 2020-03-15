import { Client } from "@elastic/elasticsearch";

export interface MigrationFileInterface {
  name: string;
  timestamp: number;
  up: (client: Client) => Promise<void>;
  down: (client: Client) => Promise<void>;
}

export const isMigrationInterface = (
  elem: unknown
): elem is MigrationFileInterface =>
  typeof elem === "object" &&
  elem !== null &&
  elem.name &&
  typeof elem.name === "string" &&
  elem.timestamp &&
  typeof elem.timestamp === "number" &&
  elem.up &&
  typeof elem.up === "function" &&
  elem.down &&
  typeof elem.down === "function";
