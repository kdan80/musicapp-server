import express, { Request, Response } from 'express';
import prisma from '@prisma';

const router = express.Router();

router.get('/', async(req: Request, res: Response) => {

    const playlist = await prisma.song.findMany();


    res.status(200).json(playlist);

});

export default router;