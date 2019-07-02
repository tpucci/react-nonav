export function last<T>(arr: T[]): T | null {
  if (arr.length < 1) { return null; }
  return arr[arr.length - 1];
}
