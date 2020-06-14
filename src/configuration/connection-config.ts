import {Client} from '@elastic/elasticsearch';
import {Driver} from 'neo4j-driver';

export type ClientGenerator<T> = () => T;

export interface ConnectionConfigElastic {
  client: ClientGenerator<Client>;
  type: 'elastic';
}

export interface ConnectionConfigNeo {
  client: ClientGenerator<Driver>;
  type: 'neo';
}

export type ConnectionConfig = ConnectionConfigNeo | ConnectionConfigElastic;
