import { ReqErr } from '../classes/RequestError'

export const handleUnknownRoutes: Ctrl = (req, res, next) => {
  console.log('get404Page')
  res.status(404).send(new ReqErr('unknown-route'))
}
