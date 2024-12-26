export function randomInteger(min: number, max: number): number {
  if (min > max) return 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
