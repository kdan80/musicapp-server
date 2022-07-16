import express, { Request, Response } from 'express';
import prisma from '@prisma';

const router = express.Router();

router.post('/', async(req: Request, res: Response) => {

    try {
        const { artist, title, album, releaseDate, genre, location } = req.body;
        //await prisma.song.deleteMany();

        const song = await prisma.song.create({
            data: {
                artist: artist,
                title: title,
                album: album,
                releaseDate: releaseDate,
                genre: genre,
                location: location
            }
        })
        
        res.status(201).json(song);

    } catch(error) {
        console.log(error)
    }

});

export default router;