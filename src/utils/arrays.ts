export function range(start: number, stop: number, step = 1): number[] {
  let a = [start]
  let b = start;
  while (b < stop) {
    a.push(b += step || 1);
  }
  return a;
}
