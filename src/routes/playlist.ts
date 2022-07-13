import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {

    const playlist = [
        'tots.mp3',
        'wc.mp3'
    ]

    res.send(playlist);

});