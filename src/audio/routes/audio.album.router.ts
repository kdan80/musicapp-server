import express, { Request, Response, NextFunction } from 'express'
import { authenticate_request ,permitted_methods } from 'src/core/middleware'
import paginate_results from '../middleware/audio.paginate_results.middleware'

const router = express.Router()

router.use('/',
    authenticate_request,
    permitted_methods(['GET']),
    paginate_results
)

router.get('/', ( req: Request, res: Response, next: NextFunction ) => {

    try {
        
        res.status(200).json(res.paginated_results)


    } catch (err) {
        next(err)
    }
})

export default router