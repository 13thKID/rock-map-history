import { Album } from '../models/album'

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
  const albums = await Album.find()

  res.send(albums)
}
