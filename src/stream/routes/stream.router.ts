import express from 'express'
import song from './stream.song'

const router = express.Router() 

router.use('/song', song)

export default router

