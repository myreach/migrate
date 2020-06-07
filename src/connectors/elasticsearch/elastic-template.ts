import { MigrationTemplate } from "../../generate/migration-template";

export class ElasticTemplate implements MigrationTemplate {
  constructor(
    public name: string,
    public timestamp = Date.now(),
    public className: string
  ) {}

  template = () => `import { ElasticSearchMigration } from '@myreach/migrate/src/migration/types/neo4j-migration';
import { Client } from '@elastic/elasticsearch';

export default class ${this.className} extends ElasticSearchMigration {
    name = '${this.name}';
    timestamp = ${this.timestamp};

    // Necessary for ElasticSearchMigration class configuration
    constructor() {
        super();
    }

    public async up(client: Client) {
        // Your code here
    }

    public async down(client: Client) {
        // Your code here
    }
}
`;
}
