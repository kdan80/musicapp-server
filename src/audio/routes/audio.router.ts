import express from 'express'
import song from './audio.song.router'
import album from './audio.album.router'
import upload from './audio.upload.router'
import { errorHandler } from '../middleware/audio.errorHandler'

const router = express.Router()

router.use('/upload', upload)
router.use('/album', album)
router.use('/song', song)
router.use(errorHandler)

export default router