import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.post('/', ( req: Request, res: Response, next: NextFunction ) => {

    try {
        console.log(req.body.info)
        res.status(200).send('jjj')

    } catch (err) {
        next(err)
    }
})

export default router