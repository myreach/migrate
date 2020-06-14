import {Client} from '@elastic/elasticsearch';
import {Migration} from './migration';
import {Writable} from 'stream';
import * as chalk from 'chalk';
import {ConnectorInterface} from '../connectors/connector-interface';
import {MigrationReadDTO} from '../dto/migration-read';

export class MigrationRunner<ClientType> {
  constructor(private stdout: Writable, private db: ConnectorInterface) {}

  protected printError(s: string) {
    this.stdout.write(chalk.red(s));
  }

  protected printSuccess(s: string) {
    this.stdout.write(chalk.green(s));
  }

  protected print(s: string) {
    this.stdout.write(chalk.blue(s));
  }

  async get(): Promise<MigrationReadDTO[]> {
    return await this.db.read();
  }

  async add(migration: Migration) {}

  async delete(migration: Migration) {}
}
