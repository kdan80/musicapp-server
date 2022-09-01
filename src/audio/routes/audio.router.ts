import express from 'express'
import stream from './audio.stream.router'
import upload from './audio.upload.router'
import { errorHandler } from '../middleware/audio.errorHandler'

const router = express.Router()

router.use('/upload', upload)
router.use('/stream', stream)
router.use(errorHandler)

export default router