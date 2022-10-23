import express, { NextFunction, Request, Response } from 'express'
import s3Client from '../storage/s3store'
import config from '../config/config'
import AlbumModel from '../models/album'
import authenticate_request from '../middleware/authenticate_request'
import permitted_methods from '../middleware/permitted_methods'

const router = express.Router();

const getSignedUrl = async(file: string) => {
    try {
        const url = await s3Client.getSignedUrlPromise(
            'getObject',
            {
                Bucket: config.s3store.bucket,
                Key: file,
                Expires: 24 * 60
            }
        )
        
        return url

    } catch (err) {
        console.log(err)
    }
}

router.use('/',
    permitted_methods(['GET']),
    authenticate_request
)

router.get('/:id', async( req: Request, res: Response, next: NextFunction ) => {
    

    try {

        const presignedUrls: string[] = []

        const album = await AlbumModel.findOne({ _id: req.params.id })
        if (!album) throw new Error('ALBUM_NOT_FOUND')

        const albumPath = album.path
        album.track_list.sort((a: any, b: any) => a.track_number - b.track_number)

        for (const track of album.track_list) {

            const { filename } = track as any
            const file = `${albumPath}/${filename}`

            const url = await getSignedUrl(file)
            if (!url) throw new Error('MINIO_ERROR')
            presignedUrls.push(url)
        }

        const response = {
            "presignedUrls": presignedUrls
        }

        return res.status(200).json(response)      
    
    } catch (err) {
        next(err)
    }
});

export default router;