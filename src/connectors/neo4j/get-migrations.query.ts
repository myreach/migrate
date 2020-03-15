export const getMigrations = (labelName: string): string =>
  `MATCH (n:${labelName}) RETURN n`;
