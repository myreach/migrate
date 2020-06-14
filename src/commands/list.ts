import {Command} from 'clipanion';
import {ConfigReader} from '../configuration/config-reader';
import {MigrationRunner} from '../migration/migration-runner';
import {MigrationComparer} from '../migration/migration-comparer';
import {migrationTable} from '../migration/migration-table';
import {ConnectorInterface} from '../connectors/connector-interface';
import {Neo4jConnector} from '../connectors/neo4j/neo4j-connector';
import {ElasticSearchConnector} from '../connectors/elasticsearch/elasticsearch-connector';
import {MigrationFileSystemReader} from '../migration-reader/migration-file-system-reader';

export class MigrationList extends Command {
  static usage = Command.Usage({
    description: 'list all migrations',
    details: 'details',
    examples: [['msg', 'command']],
  });

  @Command.String('--config')
  public configPath?: string;

  @Command.String({required: true})
  public connection!: string;

  @Command.Path('list')
  async execute() {
    // Read config file
    const configReader = new ConfigReader(this.configPath);
    const config = await configReader.load();
    const closeTasks: (() => Promise<any>)[] = [];

    const client = config.connections[this.connection];
    let db: ConnectorInterface;

    if (client.type === 'neo') {
      const driver = client.client();
      const session = driver.session();
      db = new Neo4jConnector(
        session.beginTransaction(),
        config.options.indexName
      );
      closeTasks.push(session.close);
      closeTasks.push(driver.close);
    } else if (client.type === 'elastic') {
      const es = client.client();
      db = new ElasticSearchConnector(config.options.indexName, es);
    } else {
      throw new Error('Not defined connection name');
    }

    const migrationRunner = new MigrationRunner(this.context.stdout, db);

    const migrationReader = new MigrationFileSystemReader(
      config.options.root,
      config.options.filter
    );
    console.log(await migrationReader.getMigrations());
    // const migrationComparer = new MigrationComparer(elastic, migrationReader);
    // const migrations = await migrationComparer.getAll();
    // if (migrations.length > 0) {
    //   const sortedMigrations = migrations.sort(
    //     (a, b) => a.timestamp - b.timestamp
    //   );
    //   migrationTable(sortedMigrations);
    // } else {
    //   this.context.stdout.write('There is no migrations.');
    // }

    const migrations = await migrationRunner.get();
    console.log(migrations);

    for (const task of closeTasks) {
      await task();
    }
  }
}
