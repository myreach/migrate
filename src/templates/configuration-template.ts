export const makeConfigurationTemplate = (t: {
  url: string;
  root: string;
  fileFilter: string;
}): string => `const { Client } = require('@elastic/elasticsearch');

module.exports = {
	elasticSearchClient: new Client({
		node: '${t.url}',
	}),

	options: {
		root: '${t.root}',
		filter: ${t.fileFilter},
		indexName: 'migrations',
	},
};

export options;
`;
