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
    
        const { 
            title, artist, album, duration, track_number, genre, release_year, path
        } = req.body

        const candidateSong = {
            title, artist, album, duration, track_number, genre, release_year, path
        }

        const Song = await SongModel.create(candidateSong)
        
        return res.status(200).send(`${title} successfully created`)

    } catch (err) {
        next(err)
    }
});

export default router