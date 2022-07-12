import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';


const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    try {

            const range: any = req.headers.range;
            if (!range) {
                res.status(400).send("Requires Range header");
            }

            const fileSize = fs.statSync('/home/kdan80/Projects/portfolio/musicapp-server/media/tots.mp3').size;

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

            const readStream = fs.createReadStream('/home/kdan80/Projects/portfolio/musicapp-server/media/tots.mp3', {start, end});
            
            readStream.pipe(res);

            readStream.on('end', () => {
                console.log('stream end');
            });

            readStream.on('error', () => {
                console.log('error');
            });
            
            

    } catch(error: any) {
        process.stderr.write(error);
    }
});

export default router;