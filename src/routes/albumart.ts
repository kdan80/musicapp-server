import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.use('/',
    //permitted_methods(['GET', 'POST']),
)

router.get('/:id', 
    ( req: Request, res: Response, next: NextFunction ) => {

    try {
        
        
        

    } catch (err) {
        next(err)
    }
})

export default router