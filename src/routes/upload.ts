import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import util from 'util'
import { AlbumModel, SongModel } from '@audio'
import jsmediatags from 'jsmediatags'

const router = express.Router()

const getID3Tags = (mp3: any) => {
    return new Promise((resolve, reject) => {
        jsmediatags.read(mp3, {
            onSuccess: (tag) => {
                resolve(tag.tags)
            },
            onError: (err) => {
                reject(err)
            }
        })
    })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // Create an upload directory based on the name of the uploaded album title (req.body.title)
        const upload_dir = `${process.env.MEDIA}/${req.body.title}`
        const upload_dir_exists = fs.existsSync(upload_dir)

        if (!upload_dir_exists) {
            fs.mkdirSync(upload_dir)
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

router.post('/', async( req: Request, res: Response, next: NextFunction ) => {

    try {

        await UploadMiddleware(req, res)

        const files = req.files as Express.Multer.File[] 

        for(let i = 0; i < files.length; i++){
            const mp3Binary = fs.readFileSync(files[i].path)

            const {
                title, artist, album, year, track, genre
            } = await getID3Tags(mp3Binary)


            const albumExists = await AlbumModel.exists({ artist, title: album})
            
            if (!albumExists) {
                await AlbumModel.create({
                    title: album, artist, genre, release_year: year
                })
            }

            const candidateSong = {
                title, artist, album, genre, track_number: track, release_year: year
            }

            //const song = await SongModel.create(candidateSong)


        }

        res.status(200).json('success')       
        
    } catch (err) {
        next(err)
    }
})

export default router