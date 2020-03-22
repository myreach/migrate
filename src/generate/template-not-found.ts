export class TemplateNotFound extends Error {
  constructor(type: string) {
    const msg = `Cannot found '${type}' template type. Please use 'neo4j' or 'es'.`;
    super(msg);
  }
}
