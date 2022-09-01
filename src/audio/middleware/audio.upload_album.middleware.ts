import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import util from 'util'

const storage = multer.diskStorage({
    destination: async(req, file, cb) => {

        // Create an upload directory based on the name of the uploaded album title and artist
        const upload_dir: string = `${process.env.MEDIA}/${req.body.artist}/${req.body.title}`

        try {

            // Check if the upload directory exists            
            await fs.promises.access(upload_dir)
    
            // If it does commence the upload
            return cb(null, upload_dir);

        } catch (err: any) {
            
            // If it does not exist create the upload_dir and commence the upload
            if (err.code === 'ENOENT') {
                await fs.promises.mkdir(upload_dir, { recursive: true })
                console.log('upload_dir created')
                return cb(null, upload_dir);
            }

            console.log('upload error')
        }

    },
    filename: async(req, file, cb) => {

        try {
        
            // If the user stops the upload we need to remove the partially uploaded album
            req.on('aborted', async() => {
                await fs.promises.rm(`${file.destination}`, { recursive: true });  
            });

            return cb(null, file.originalname);

        } catch (err) {
            console.log(err)
        }
    }
});

const upload = multer({storage: storage})
const UploadMiddleware = util.promisify(upload.array('album', 30))

const upload_album = async( req: Request, res: Response, next: NextFunction ) => {

    try {

        // Grab the array of uploaded mp3 files
        await UploadMiddleware(req, res)
        const files = req.files as Express.Multer.File[] 

        // Read in the album info from disk
        const info_raw = fs.readFileSync(`${process.env.MEDIA}/${req.body.artist}/${req.body.title}/info.json`, 'utf8')
        const info = JSON.parse(info_raw);
        req.body.info = info
        req.body.path = files[0].destination
        
        next()

    } catch (err) {
        next(err)
    }
}

export default upload_album