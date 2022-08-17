import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    throw new Error('This is an error');

    res.json({ status: 'ok' });
});

export default router;