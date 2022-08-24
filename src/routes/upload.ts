import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import util from 'util'

const router = express.Router()

const temp_storage = `${process.env.MEDIA}/temp`;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, temp_storage);
    },
    filename: (req, file, cb) => {
        
        // Remove the file extension from the file name (it will be transcoded and a new file extension added later)
        //originalname = path.parse(file.originalname).name;
        cb(null, file.originalname);
        
        // If the user stops the upload we need to remove the partially uploaded file
        req.on("aborted", () => {
            fs.unlink(`${temp_storage}/${file.originalname}`, () => console.log("file removed"));  
        });
    }
});

const upload = multer({storage: storage}).array('album', 30)

const UploadMiddleware = util.promisify(upload)

router.post('/', async( req: Request, res: Response, next: NextFunction ) => {

    try {

        await UploadMiddleware(req, res)

        const info_raw = fs.readFileSync(`${temp_storage}/info.json`, 'utf8')
        const info = JSON.parse(info_raw)

        return res.status(200).json(info)
    } catch (err) {
        next(err)
    }
})

export default router