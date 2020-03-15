import { Migration } from '../migration/migration';

export interface MigrationReader {
  getMigrations(path: any): Migration[];
}
