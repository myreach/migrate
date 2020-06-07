import {EsMigrationsConfig} from './src/configuration/migrations-config.interface';

const {Client} = require('@elastic/elasticsearch');

const options: EsMigrationsConfig = {
  elasticSearchClient: new Client({
    node: 'http://localhost:9200',
  }),

  options: {
    root: './src',
    filter: /.*\.ts$/,
    indexName: 'migrations',
  },
};

export default options;
