import { Album } from '../models/album'
import { parseQueryDate } from '../helpers/parsers'
import { ReqErr } from '../classes/RequestError'

export const addAlbum: Ctrl = async (req, res, next) => {
  const title = 'Black Sabbath'
  const released = new Date()
  const recorded = new Date()
  const studio = 'studio'
  const label = 'label'
  const producer = 'producer'
  const cover = 'some cover'

  const album = new Album({
    title,
    released,
    recorded,
    studio,
    label,
    producer,
    cover,
  })

  try {
    await album.save()
  } catch (error) {
    res.send(error)
    return
  }

  res.send(album._id)
}

export const getAllAlbums: Ctrl = async (req, res, next) => {
  const filteredQuery: Record<string, any> = {}
  const acceptableFields = ['released', 'recorded']

  console.log(req.query)

  for (const field of Object.keys(req.query)) {
    if (!acceptableFields.includes(field)) {
      res.send(new ReqErr('unknown-query-param', field))
      break
    }

    switch (field) {
      case 'released':
      case 'recorded':
        const date = (req.query[field] as string).split(',')
        if (date.length === 2) {
          const start = Date.parse(date[0])
          const end = Date.parse(date[1])

          if (isNaN(start) || isNaN(end)) {
            res.send(new ReqErr('invalid-date-format'))
            return
          }

          filteredQuery[field] = {
            $gte: new Date(start),
            $lt: new Date(end),
          }
        } else {
          const timestamp = Date.parse(req.query[field] as string)
          if (isNaN(timestamp)) {
            res.send(new ReqErr('invalid-date-format'))
            return
          }
          filteredQuery[field] = new Date(timestamp)
        }
        break
      default:
        filteredQuery[field] = req.query[field]
    }
  }

  console.log(filteredQuery)

  // const released = req.query.released as string | undefined
  // console.log(released)
  // console.log(released && new Date(released))

  const albums = await Album.find(filteredQuery)
  // const albums = await Album.find()

  res.send(albums)
}

export const getAlbumById: Ctrl = async (req, res, next) => {
  const id = req.params.id

  const album = await Album.find().byId(id)

  res.send(album?._id)
}
