import express, { Request, Response } from 'express';
import fs from 'fs';
import { pipeline } from 'stream';
import path from 'path';


const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    try {

            const range: any = req.headers.range;
            if (!range) {
                res.status(400).send("Requires Range header");
            }

            console.log(`Dir: ${__dirname}`)
            const fileSize = fs.statSync(`${process.env.MEDIA}/tots.mp3`).size;

            const CHUNK_SIZE = 10 ** 6; // 1MB
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

            // Create headers
            const contentLength = end - start + 1;
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "audio/mpeg",
            };

            // HTTP Status 206 for Partial Content
            res.writeHead(206, headers);

            const readStream = fs.createReadStream(`${process.env.MEDIA}/tots.mp3`, {start, end});

            // Use pipeline() not readStream.pipe(res) as the latter can lead to memory leaks
            pipeline(
                readStream, 
                res, 
                (err) => {
                    if(err) return console.log(err);
                    console.log('Pipeline closed...');
                }
            )
    } catch(error: any) {
        process.stderr.write(error);
    }
});

export default router;