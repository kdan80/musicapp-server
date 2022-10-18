import express, { NextFunction, Request, Response } from 'express';
import minioClient from 'src/storage/minio';
import config from '@config';
import AlbumModel from '@models/album';

const router = express.Router();

router.get('/:id', async( req: Request, res: Response, next: NextFunction ) => {
    
    try {

        const presignedUrls: string[] = []

        const album = await AlbumModel.findOne({ _id: req.params.id })
        if (!album) throw new Error('ALBUM_NOT_FOUND')

        const albumPath = album.path
        album.track_list.sort((a: any, b: any) => a.track_number - b.track_number)

        for await (const track of album.track_list) {

            const file = `${albumPath}/${track.filename}`

            minioClient.presignedUrl('GET', config.minio.bucket, file, 24*60*60, function(err, presignedUrl) {
                if (err) return console.log(err)
                presignedUrls.push(presignedUrl)
            })
        }

        const response = {
            "presignedUrls": presignedUrls
        }
        
        return res.status(200).json(response)      
    
    } catch (err) {
        next(err);
    }
});

export default router;