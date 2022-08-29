import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', async(req: Request, res: Response) => {

    try {
        const { artist, title, album, releaseDate, genre, location } = req.body;

        
        res.status(201).json(title);

    } catch(error) {
        console.log(error)
    }

});

export default router;