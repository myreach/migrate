import {Client} from '@elastic/elasticsearch';

export interface MigrationFileInterface<ClientType> {
  name: string;
  timestamp: number;
  up: (client: ClientType) => Promise<void>;
  down: (client: ClientType) => Promise<void>;
}

export const isMigrationInterface = <T>(
  elem: any
): elem is MigrationFileInterface<T> =>
  typeof elem === 'object' &&
  elem !== null &&
  elem.name &&
  typeof elem.name === 'string' &&
  elem.timestamp &&
  typeof elem.timestamp === 'number' &&
  elem.up &&
  typeof elem.up === 'function' &&
  elem.down &&
  typeof elem.down === 'function';
