import { drawRandom, randomDate } from './utils'
import { Album } from '../models/album'
import connectDb from '../config/db.config'
import chalk from 'chalk'

const N = 10

const labels = ['Vertigo', 'A&M Records', 'Atlantic Records', 'Eagle Records', 'Impact Records']
const titles = [
  'Black Sabbath',
  'Led Zeppelin I',
  'Led Zeppelin II',
  'Led Zeppelin III',
  'Led Zeppelin IV',
]
const producers = [
  'Rick Rubin',
  'Dr Dre',
  'Sir George Martin',
  'Nile Rodgers',
  'Quincy Jones',
  'Martin Hannett',
  'John Leckie',
  'Steve Albini',
  'Linda Perry',
]

connectDb(async () => {
  for (let i = 0; i < N; i++) {
    const album = new Album({
      title: drawRandom(titles),
      released: randomDate(),
      recorded: randomDate(),
      label: drawRandom(labels),
      studio: 'studio',
      producer: drawRandom(producers),
      cover: 'none',
    })

    await album.save()
    console.log(chalk.blue(`Almbum ${i + 1}: ${album.title} was pushed`))
  }

  process.exit(1)
})
