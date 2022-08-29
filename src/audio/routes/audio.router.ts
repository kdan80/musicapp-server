import express from 'express'
import song from './audio.song.router'
import { errorHandler } from '../middleware/audio.errorHandler'

const router = express.Router()

router.use('/song', song)
router.use(errorHandler)

export default router