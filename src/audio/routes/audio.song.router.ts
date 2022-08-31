import express, { NextFunction, Request, Response } from 'express'
import { SongModel } from '../models/audio.song.model';

const router = express.Router()

// Login Middleware
// router.use('/', 
//     permitted_methods(['POST']),
//     superfluous_login
// );

router.post('/', async( req: Request, res: Response, next: NextFunction ) => {

    try {
         
        return res.status(200).send(`Song route redirect`)

    } catch (err) {
        next(err)
    }
});

export default router