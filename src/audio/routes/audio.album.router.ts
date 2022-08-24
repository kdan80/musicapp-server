import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.post('/', ( req: Request, res: Response, next: NextFunction ) => {

    try {



    } catch (err) {
        next(err)
    }
})

export default router