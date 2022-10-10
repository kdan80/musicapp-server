import express, { NextFunction, Request, Response } from 'express';
import { pipeline } from 'stream';
import SongModel from 'src/models/song'
import minioClient from 'src/storage/minio';
import config from '@config';
import AlbumModel from '@models/album';
import fs from 'fs'

const router = express.Router();

router.get('/:nanoid', async( req: Request, res: Response, next: NextFunction ) => {
    
    try {
            console.log('stream request received')
            const nanoid = req.params.nanoid;

            const song = await SongModel.findOne({ nano_id: nanoid })
            if (!song) throw new Error('SONG_NOT_FOUND')
            console.log('Found ', song.title)

            const album = await AlbumModel.findOne({ _id: song.album})
            if (!album) throw new Error('ALBUM_NOT_FOUND')

            const range: any = req.headers.range;
            if (!range) throw new Error('REQUIRES_RANGE_HEADER');

            let fileSize = 0
            minioClient.getObject(config.minio.bucket, `${song.artist}/${album.title}/${song.filename}`, (err, dataStream) => {
                if (err) console.log(err)
            
                dataStream.on('data', function(chunk) {
                    fileSize += chunk.length
                })
                
                dataStream.on('end', () => {
                    console.log('End. Total size = ' + fileSize)

                    const CHUNK_SIZE = 10 ** 6; // 1MB
                    const start = Number(range.replace(/\D/g, ''));
                    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

                    // Create headers
                    const contentLength = end - start + 1;
                    const headers = {
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': contentLength,
                        'Content-Type': 'audio/mpeg',
                    };

                    // HTTP Status 206 for Partial Content
                    res.writeHead(206, headers);

                    //const readStream = fs.createReadStream(song.path, {start, end});

                    // Use pipeline() not readStream.pipe(res) as the latter can lead to memory leaks
                    console.log('streaming ', song.title)
                    pipeline(
                        dataStream, 
                        res, 
                        (err) => { throw new Error('PIPELINE_ERROR') }
                    )
                })
                
                dataStream.on('error', function(err) {
                console.log(err)
                })
            })

            //const fileSize = fs.statSync(song.path).size;

    } catch (err) {
        next(err);
    }
});

export default router;






// import express, { NextFunction, Request, Response } from 'express';
// import fs from 'fs';
// import { pipeline } from 'stream';
// import SongModel from 'src/models/song'
// import minioClient from 'src/storage/minio';
// import config from '@config';

// const router = express.Router();

// router.get('/:nanoid', async( req: Request, res: Response, next: NextFunction ) => {
    
//     try {
//             const nanoid = req.params.nanoid;

//             const song = await SongModel.findOne({ nano_id: nanoid })
//             if (!song) throw new Error('SONG_NOT_FOUND')

//             const range: any = req.headers.range;
//             if (!range) throw new Error('REQUIRES_RANGE_HEADER');

//             let fileSize = 0
//             minioClient.getObject(config.minio.bucket, `${song.artist}/${song.album}/${song.title}`, (err, dataStream) => {
//                 if (err) throw new Error('MINIO_ERROR')
            
//                 dataStream.on('data', function(chunk) {
//                 fileSize += chunk.length
//                 })
                
//                 dataStream.on('end', function() {
//                 console.log('End. Total size = ' + fileSize)
//                 })
                
                
                
//                 dataStream.on('error', function(err) {
//                 console.log(err)
//                 })
//             })

//             //const fileSize = fs.statSync(song.path).size;

//             const CHUNK_SIZE = 10 ** 6; // 1MB
//             const start = Number(range.replace(/\D/g, ''));
//             const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

//             // Create headers
//             const contentLength = end - start + 1;
//             const headers = {
//                 'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//                 'Accept-Ranges': 'bytes',
//                 'Content-Length': contentLength,
//                 'Content-Type': 'audio/mpeg',
//             };

//             // HTTP Status 206 for Partial Content
//             res.writeHead(206, headers);

//             const readStream = fs.createReadStream(song.path, {start, end});

//             // Use pipeline() not readStream.pipe(res) as the latter can lead to memory leaks
//             pipeline(
//                 readStream, 
//                 res, 
//                 (err) => { throw new Error('PIPELINE_ERROR') }
//             )

//     } catch (err) {
//         next(err);
//     }
// });

// export default router;