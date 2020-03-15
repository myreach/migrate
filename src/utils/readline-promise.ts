export const readlinePromise = (readline: any) => {
  readline.questionAsync = (question: string) =>
    new Promise((res, rej) => {
      readline.question(question, (answer: string) => {
        res(answer);
      });
    });
  return readline;
};
