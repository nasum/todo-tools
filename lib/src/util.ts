export function range(start: string, stop: string) {
  const result = [];
  const end = stop.charCodeAt(0);
  for (let index = start.charCodeAt(0); index <= end; index++) {
    result.push(String.fromCharCode(index));
  }
  return result;
}
