import { Command } from "clipanion";
import { ConfigReader } from "../configuration/config-reader";

export class ConfigCommand extends Command {
  static usage = Command.Usage({
    description: "check config before running",
    details: "details",
    examples: [["msg", "command"]]
  });

  @Command.String("--config")
  configPath?: string;

  @Command.Path("config")
  async execute() {
    this.context.stdout.write("config!\n");

    const options = await ConfigReader.load(this.configPath);

    this.context.stdout.write(JSON.stringify(options));
  }
}
