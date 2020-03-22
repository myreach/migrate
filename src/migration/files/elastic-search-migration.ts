import { MigrationFileInterface } from "./migration-file-interface";
import { Client } from "@elastic/elasticsearch";

export abstract class ElasticSearchMigration
  implements MigrationFileInterface<Client> {
  abstract down: (client: Client) => Promise<void>;
  abstract name: string;
  abstract timestamp: number;
  abstract up: (client: Client) => Promise<void>;
}
