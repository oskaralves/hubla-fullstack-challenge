export function parseNumberOrDefault<T>(
  value: T,
  defaultValue: number,
  transform?: (num: number) => number
): number {
  let number = parseInt(value as string, 10);
  if (isNaN(number)) {
    number = defaultValue;
  }
  return transform ? transform(number) : number;
}
