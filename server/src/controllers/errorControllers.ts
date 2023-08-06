import { ReqErr } from '../classes/RequestError'

export const handleUnknownRoutes: Ctrl = (req, res, next) => {
  res.status(404).send(new ReqErr('unknown-route'))
}
