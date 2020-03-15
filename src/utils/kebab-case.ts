export const toKebabCase = (str: string) => {
  if (str) {
    const match = str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    );
    if (match) {
      return match.map(x => x.toLowerCase()).join("-");
    }
  }
  return "";
};
