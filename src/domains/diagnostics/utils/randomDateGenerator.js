// A random date generator written by Houssein, useful to create mock data
export const randomDateGenerator = (start, end) =>
  new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  ).getTime();
