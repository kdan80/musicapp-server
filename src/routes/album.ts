import express, { Request, Response, NextFunction } from 'express'
import paginate_results from 'src/middleware/paginate_results'
import authenticate_request from 'src/middleware/authenticate_request'
import permitted_methods from 'src/middleware/permitted_methods'
import create_album from 'src/middleware/create_album'
import create_song from 'src/middleware/create_song'

const router = express.Router()

router.use('/',
    permitted_methods(['GET', 'POST']),
)

router.get('/', 
    authenticate_request,
    paginate_results,
    ( req: Request, res: Response, next: NextFunction ) => {

    try {
        
        res.status(200).json(res.paginated_results)


    } catch (err) {
        next(err)
    }
})

// Route for creating an AlbumModel + SongModels in the mongo store
router.post('/', 
    create_album,
    create_song,
    ( req: Request, res: Response, next: NextFunction ) => {

    try {


        return res.status(200).send(`${req.body.album} was successfully created`)

    } catch(err) {
        next(err)
    }
})

export default router