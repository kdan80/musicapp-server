import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import util from 'util'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // Create an upload directory based on the name of the uploaded album title (req.body.title)
        const upload_dir = `${process.env.MEDIA}/${req.body.artist}/${req.body.title}`
        const upload_dir_exists = fs.existsSync(upload_dir)
        if (!upload_dir_exists) {
            fs.mkdirSync(upload_dir, { recursive: true })
        }

        cb(null, upload_dir);

    },
    filename: (req, file, cb) => {
        
        // Remove the file extension from the file name (it will be transcoded and a new file extension added later)
        //originalname = path.parse(file.originalname).name;
        cb(null, file.originalname);
        
        // If the user stops the upload we need to remove the partially uploaded file
        // req.on("aborted", () => {
        //     fs.unlink(`${temp_storage}/${file.originalname}`, () => console.log("file removed"));  
        // });
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

        // Redirect to the audio module to create album model
        next()

    } catch (err) {
        next(err)
    }
}

export default upload_album