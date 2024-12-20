export const seedConsole = (context: string, message: string) => {
  console.log(
    `${new Date()
      .toISOString()
      .slice(11, 23)} \x1b[32m[${context}]\x1b[0m ${message}`,
  );
};
