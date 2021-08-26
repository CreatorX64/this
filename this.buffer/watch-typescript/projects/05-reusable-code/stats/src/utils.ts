export const dateStringToDate = (dateString: string): Date => {
  const dateParts = dateString
    .split("/")
    .map((value: string): number => Number(value));

  // Date() accepts month (second argument) as zero indexed.
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
