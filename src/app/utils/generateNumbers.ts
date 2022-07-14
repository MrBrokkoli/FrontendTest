export function generateNumbers(length: number): number[] {
  const data: number[] = [];

  for (let i = 0; i < length; i++)
    data.push(Math.random() * 10);

  return data;
}