const fs = require('fs');
const path = require('path');
const { getRandomInt, getMonths } = require('./utils.js');

const N = 10

const res = []

let year = getRandomInt(1950, 1966)

for (let i = 0; i < N; i++) {
  let randomMonths = getMonths(getRandomInt(2, 5))

  res.push({
    year: year,
    months: randomMonths.map((month, i) => ({
      month: month,
      bands: [],
      events: [],
      albums: []
    }))
  })

  year += getRandomInt(1, 6)
}

fs.writeFile(path.join(__dirname, '..', 'timeline.json'), JSON.stringify(res, null, 2), (err) => {
  console.log(err)
})
