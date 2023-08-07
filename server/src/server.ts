import app from './app'
import connectDb from './config/db.config'

const port = process.env.PORT

connectDb(() => {
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`)
  })
})

// app.listen(port, () => {
//   console.log(`Listening on http://localhost:${port}/`)
// })
