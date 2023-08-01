export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

export function drawRandom<T extends string | number | object>(arr: T[]): T {
  return arr[getRandomInt(0, arr.length)]
}

export function randomDate(start = new Date(1950, 0, 1), end = new Date(2000, 11, 31)) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
