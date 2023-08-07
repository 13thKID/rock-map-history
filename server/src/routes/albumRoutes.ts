import express from 'express'
import { addAlbum, getAllAlbums, getAlbumById } from '../controllers/albumControllers'
import { validateObjectId } from '../middleware/validators'

const router = express.Router()

router.get('/albums', getAllAlbums)

router.get('/albums/:id', validateObjectId, getAlbumById)

router.post('/albums', addAlbum)

export default router
