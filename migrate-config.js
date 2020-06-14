const {Client} = require('@elastic/elasticsearch');
const {driver, auth} = require('neo4j-driver');

module.exports = {
  connections: {
    elastic: {
      client: () =>
        new Client({
          node: 'http://localhost:9200',
        }),
      type: 'elastic',
    },
    neo: {
      client: () =>
        driver('bolt://localhost:7687', auth.basic('neo4j', 'reach')),
      type: 'neo',
    },
  },

  options: {
    root: '.',
    filter: /.*\.es-migration\.js$/,
    indexName: 'migrations',
  },
};
