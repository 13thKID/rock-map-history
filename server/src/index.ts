import express from 'express'
import connectDb from './config/db.config'
import 'dotenv/config'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import albumRoutes from './routes/albumRoutes'
import { handleUnknownRoutes } from './controllers/errorControllers'

if (!process.env) {
  console.log(chalk.red('ENV variables are undefined'))
}

const port = process.env.PORT
let server: ReturnType<typeof app.listen>

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(albumRoutes)
app.use(handleUnknownRoutes)

// connectDb(() => {
//   server = app.listen(port, () => {
//     console.log(`Listening on http://localhost:${port}/`)
//   })
// }, true)

export default app
