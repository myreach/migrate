export const getMigrations = (labelName:string):string => {
    return `MATCH (n:${labelName}) RETURN n`;
};