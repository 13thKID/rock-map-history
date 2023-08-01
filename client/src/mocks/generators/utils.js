const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function rpt(n, cb) {
  for (let i = 0; i < n; i++) {
    cb()
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getMonths(n) {
  let draw = []
  rpt(n, () => {
    draw.push(getRandomInt(0, 12))
  })
  draw.sort()

  return draw.map((i) => MONTHS[i])
}

module.exports = {
  getRandomInt,
  getMonths
}
