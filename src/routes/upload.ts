import express, { NextFunction, Request, Response } from 'express'
import permitted_methods from 'src/middleware/permitted_methods'
import upload_album from 'src/middleware/upload_album'
import create_album from 'src/middleware/create_album'
import create_song from 'src/middleware/create_song'
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