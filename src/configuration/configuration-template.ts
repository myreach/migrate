export const makeConfigurationTemplate = (t: {
  url: string;
  root: string;
  fileFilter: string;
}): string => `const { Client } = require('@elastic/elasticsearch');
const { driver, auth } = require('neo4j-driver');

module.exports = {
  connections: {
    elastic: () =>
      new Client({
        node: 'http://localhost:9200',
      }),
    neo: () => driver('bolt://localhost:7687', auth.basic('neo4j', 'reach')),
  },

  options: {
    root: '${t.root}',
    filter: ${t.fileFilter},
    indexName: 'migrations',
  },
};

export options;
`;
