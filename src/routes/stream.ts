import express, { NextFunction, Request, Response } from 'express'
import minioClient from '../storage/minio'
import config from '../config/config'
import AlbumModel from '../models/album'
import authenticate_request from '../middleware/authenticate_request'
import permitted_methods from '../middleware/permitted_methods'

const router = express.Router();

// Wrap the minioClient request in a promise
const getPresignedUrl = (file: string): Promise<string> => {
    
    return new Promise((resolve, reject) => {
        
        minioClient.presignedUrl('GET', config.minio.bucket, file, 24*60*60, function(err, presignedUrl) {
            if (err) reject(err)
            resolve(presignedUrl)
        })
    })
}

// router.use('/',
//     permitted_methods(['GET']),
//     authenticate_request
// )

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

            const url = await getPresignedUrl(file)
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