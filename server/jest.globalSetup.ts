import connectDb from './src/config/db.config'
import app from './src/app'

require('ts-node/register')

const setup = async (): Promise<void> => {
  // console.log('\n')
  // await connectDb(null, false)
  // app.listen(process.env.PORT, () => {
  //   console.log(`Listening on http://localhost:${process.env.PORT}/`)
  // })
}

export default setup
