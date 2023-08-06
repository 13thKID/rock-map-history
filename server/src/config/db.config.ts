import mongoose, { Mongoose } from 'mongoose'
import chalk from 'chalk'

const DB_USER = 'rockhistorymap_server'
const DB_PSWD = 'hT6JRtSnR4SQZQSm'

export const CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PSWD}@cluster0.kph1wxu.mongodb.net/rock_history_map?retryWrites=true&w=majority`

export default async (cb: Function | null | undefined, silent = false) => {
  let mg: typeof mongoose | undefined

  try {
    mg = await mongoose.connect(CONNECTION_URL)
    if (!silent) console.log(chalk.green('🛢️  Mongoose connected successfully!'))
    if (cb) cb()
  } catch (error) {
    if (!silent) {
      console.log(chalk.red('🛢️  Mongoose had problems to connect'))
      console.log(error)
    }
  }
  return mg
}
