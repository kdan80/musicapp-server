import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'

const router = express.Router()

const temp_storage = process.env.MEDIA;

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
            fs.unlink(`${temp_storage}/${file.originalname}`, () => process.stdout.write("file removed\n"));  
        });
    }
});

const upload = multer({storage: storage});

router.post('/', ( req: Request, res: Response, next: NextFunction ) => {

    try {

    } catch (err) {
        next(err)
    }
})