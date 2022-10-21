import express, { Request, Response, NextFunction } from 'express'
import paginate_results from '../middleware/paginate_results'
import authenticate_request from '../middleware/authenticate_request'
import permitted_methods from '../middleware/permitted_methods'
import create_album from '../middleware/create_album'
import create_song from '../middleware/create_song'

const router = express.Router()

// router.use('/',
//     permitted_methods(['GET', 'POST']),
// )

router.get('/', 
    //authenticate_request,
    paginate_results,
    ( req: Request, res: Response, next: NextFunction ) => {

    console.log('XX Album: ', req.url)
    const paginated_results = req.body.paginated_results

    try {
        res.status(200).json(paginated_results)
    } catch (err) {
        next(err)
    }
})

// Route for creating an AlbumModel + SongModels in the mongo store
router.post('/', 
    authenticate_request,
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