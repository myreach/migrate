export const makeConfigurationTemplate = (t: {
  url: string;
  root: string;
  fileFilter: string;
}): string => `const { Client } = require('@elastic/elasticsearch');
const { driver, auth } = require('neo4j-driver');

module.exports = {
	elasticSearchClient: () => 
      new Client({
          node: '${t.url}',
      }),


	neo4jDriver: () => 
      driver('url', auth.basic('user','pwd'), {});

	options: {
		root: '${t.root}',
		filter: ${t.fileFilter},
		indexName: 'migrations',
	},
};

export options;
`;
