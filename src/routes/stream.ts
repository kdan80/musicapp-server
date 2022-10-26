import express, { NextFunction, Request, Response } from 'express'
import s3Client from '../storage/s3store'
import config from '../config/config'
import AlbumModel from '../models/album'
import authenticate_request from '../middleware/authenticate_request'
import permitted_methods from '../middleware/permitted_methods'
import * as AWS from 'aws-sdk'

const router = express.Router();

const signer = new AWS.CloudFront.Signer( config.s3store.cf_access_key, config.s3store.cf_private_key)

const getCloudfrontUrl = (file: string) => {

    // 2 days as milliseconds to use for link expiration
    const twoDays = 2*24*60*60*1000

    // sign a CloudFront URL that expires 2 days from now
    const signedUrl = signer.getSignedUrl({
        url: `${config.s3store.cf_url}/${file}`,
        expires: Math.floor((Date.now() + twoDays)/1000), // Unix UTC timestamp for now + 2 days
    })

    return signedUrl
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

            const url = getCloudfrontUrl(file)
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