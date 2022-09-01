import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { pipeline } from 'stream';
import { SongModel } from '../models/audio.song.model'

const router = express.Router();

router.get('/:nanoid', async( req: Request, res: Response, next: NextFunction ) => {
    
    try {
            const nanoid = req.params.nanoid;

            const song = await SongModel.findOne({ nano_id: nanoid })
            if (!song) throw new Error('Song not found')

            const range: any = req.headers.range;
            if (!range) {
                throw new Error('Requires Range header');
            }

            const fileSize = fs.statSync(song.path).size;

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

            const readStream = fs.createReadStream(song.path, {start, end});

            // Use pipeline() not readStream.pipe(res) as the latter can lead to memory leaks
            pipeline(
                readStream, 
                res, 
                (err) => {
                    if (err) throw new Error('Pipeline error');
                    console.log('Pipeline closed...');
                }
            )

    } catch (err) {
        next(err);
    }
});

export default router;