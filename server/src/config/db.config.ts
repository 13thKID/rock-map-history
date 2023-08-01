import mongoose, { Mongoose } from 'mongoose'
import chalk from 'chalk'

const DB_USER = 'rockhistorymap_server'
const DB_PSWD = 'hT6JRtSnR4SQZQSm'

const CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PSWD}@cluster0.kph1wxu.mongodb.net/rock_history_map?retryWrites=true&w=majority`

export default async (cb: Function) => {
  let mg: typeof mongoose | undefined

  try {
    mg = await mongoose.connect(CONNECTION_URL)
    console.log(chalk.green('🛢️  Mongoose connected successfully!'))
    cb()
  } catch (error) {
    console.log(chalk.red('🛢️  Mongoose had problems to connect'))
    console.log(error)
  }
  return mg
}
