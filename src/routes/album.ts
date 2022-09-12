import express, { Request, Response, NextFunction } from 'express'
import paginate_results from 'src/middleware/paginate_results'
import authenticate_request from 'src/middleware/authenticate_request'
import permitted_methods from 'src/middleware/permitted_methods'

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