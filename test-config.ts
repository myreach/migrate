import {MigrationsConfig} from './src/configuration/migrations-config.interface';

import {Client} from '@elastic/elasticsearch';

const options: MigrationsConfig = {
  connections: {
    elastic: {
      client: () =>
        new Client({
          node: 'http://localhost:9200',
        }),
      type: 'elastic',
    },
  },

  options: {
    root: './src',
    filter: /.*\.ts$/,
    indexName: 'migrations',
  },
};

export default options;
