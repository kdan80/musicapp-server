import express, { NextFunction, Request, Response } from 'express'
import { permitted_methods } from 'src/core/middleware'
import upload_album from '../middleware/audio.upload_album.middleware'
import create_album from '../middleware/audio.create_album.middleware'
import create_song from '../middleware/audio.create_song.middleware'
const router = express.Router()

// Upload Middleware
router.use('/', 
    permitted_methods(['POST']),
    upload_album,
    create_album,
    create_song
);

router.post('/', async( req: Request, res: Response, next: NextFunction ) => {

    try {

       res.status(200).json('album successfully uploaded')

    } catch (err) {
        next(err)
    }
})

export default router