export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

export function normalDist(x: number, mean: number, stdDev: number) {
  return Math.exp(-(Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))))
}
