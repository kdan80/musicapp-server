import { NextFunction, Request, Response } from 'express'
import AlbumModel from 'src/models/album'

interface Results {
    next?: {
        page: number,
        limit: number,
    },
    previous?: {
        page: number,
        limit: number,
    },
    results?: any
}

const paginate_results = async( req: Request, res: Response, next: NextFunction ) => {

    try {
        const page = parseInt(req.query.page as string)
        const limit = parseInt(req.query.limit as string)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results: Results = {}
       
        if (endIndex < await AlbumModel.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        results.results = await AlbumModel.find().sort({artist: 1}).limit(limit).skip(startIndex).exec()
        res.paginated_results = results

        next()

    } catch (err) {
        next(err)
    }
}

export default paginate_results