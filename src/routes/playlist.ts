import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {

    const playlist = [
        "alexandria",
        "contingency",
        "package",
        "overture",
        "spear",
    ]

    res.send(playlist);

});

export default router;