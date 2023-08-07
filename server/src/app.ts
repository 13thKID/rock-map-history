import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import albumRoutes from './routes/albumRoutes'
import { handleUnknownRoutes } from './controllers/errorControllers'

if (!process.env) {
  console.log(chalk.red('ENV variables are undefined'))
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(albumRoutes)
app.use(handleUnknownRoutes)

export default app
