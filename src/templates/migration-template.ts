export interface MigrationTemplate {
  name: string;
  className: string;
  timestamp: number;
  template(): string;
}
