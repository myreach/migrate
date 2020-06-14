import {resolve} from 'path';
import {walk} from '../utils/walk';
import {Migration} from '../migration/migration';
import {isMigrationInterface} from '../migration/migration-file-interface';
import {MigrationReader} from './migration-reader-interface';

export class MigrationFileSystemReader implements MigrationReader {
  constructor(
    public path = process.cwd(),
    public pattern: string | RegExp = '.*\\.es-migration\\.js$'
  ) {}

  private async getMatchingFiles(
    path: string,
    pattern: string | RegExp
  ): Promise<string[]> {
    const allFilenames = await walk(path);
    const matchingFilenames = allFilenames.filter(filename =>
      filename.match(pattern)
    );
    return matchingFilenames.map(filename => resolve(filename));
  }

  async getMigrations(): Promise<Migration[]> {
    const files = await this.getMatchingFiles(this.path, this.pattern);

    const migrationsRaw = await Promise.all(
      files.map(
        async (filename: string) => (await import(filename)).default as unknown
      )
    );
    const migrations = migrationsRaw
      // Instance the migration
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      .map(migration => new migration())
      // Filter the instances that are malformed
      .filter(migration => isMigrationInterface(migration))
      // Then apply class
      .map(
        migration =>
          new Migration(migration.timestamp, migration.name, migration)
      );

    return migrations;
  }
}
