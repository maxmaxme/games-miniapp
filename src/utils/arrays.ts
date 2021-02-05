/**
 * @param {number} start
 * @param {number} stop
 * @param {number} step
 * @return {number[]}
 */
export function range(start: number, stop: number, step = 1): number[] {
  const a = [start];
  let b = start;
  while (b < stop) {
    a.push(b += step || 1);
  }
  return a;
}
