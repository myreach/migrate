import { Migration } from '../migration/migration';

export interface MigrationReader {
  getMigrations(): Promise<Migration[]>;
}
