export const getYears = ({
  from,
  till,
}: {
  from: number;
  till: number;
}): number[] => {
  if (!from || !till) return [];
  const years: number[] = [];

  for (let i = from; i >= till; i -= 1) {
    years.push(i);
  }

  return years;
};
