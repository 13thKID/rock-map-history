import express from 'express'
import { addAlbum, getAllAlbums } from '../controllers/albumControllers'

const router = express.Router()

router.get('/albums', getAllAlbums)

router.post('/albums', addAlbum)

export default router
