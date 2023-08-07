import { Types } from 'mongoose'
import { ReqErr } from '../classes/RequestError'

export const validateObjectId: Ctrl = (req, res, next) => {
  console.log('validateObjectId')
  if (Types.ObjectId.isValid(req.params.id)) {
    next()
  } else {
    res.send(new ReqErr('invalid-id'))
  }
}
