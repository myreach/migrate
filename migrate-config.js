const { Client } = require("@elastic/elasticsearch");

module.exports = {
  elasticSearchClient: () =>
    new Client({
      node: "http://localhost:9200"
    }),

  options: {
    root: ".",
    filter: /.*\.es-migration\.js$/,
    indexName: "migrations"
  }
};
