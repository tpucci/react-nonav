export function arrayify<T>(arg: T | T[]): T[] {
  // @ts-ignore
  if (!arg.length) {
    // @ts-ignore
    return [arg];
  }
  // @ts-ignore
  return arg;
}
