import express, { Request, Response } from 'express'


const router = express.Router()

router.get('/', async( req: Request, res: Response ) => {

    return res.status(200).send('hello world')
});

export default router