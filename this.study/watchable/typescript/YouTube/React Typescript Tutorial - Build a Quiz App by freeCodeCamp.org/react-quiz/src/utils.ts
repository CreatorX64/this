export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort((_1, _2) => Math.random() - 0.5);
};
