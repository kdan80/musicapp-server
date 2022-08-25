import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import util from 'util'
import { AlbumModel, SongModel } from '@audio'
import jsmediatags from 'jsmediatags'

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

const upload = multer({storage: storage})

const UploadMiddleware = util.promisify(upload.array('album', 30))

router.post('/', async( req: Request, res: Response, next: NextFunction ) => {

    try {

        await UploadMiddleware(req, res)

        //const info = fs.readFileSync(`${temp_storage}/info.json`, 'utf8')
        //const candidateAlbum = JSON.parse(info)

        //const album = await AlbumModel.create(candidateAlbum)

        const files = req.files as Express.Multer.File[] 

        files.forEach(file => {

            const mp3Binary = fs.readFileSync(file.path)

            jsmediatags.read(mp3Binary, {
                onSuccess: async(tag) => {
                    console.log('tag: ', tag)
    
                    const {
                        title, artist, album, year, track, genre
                    } = tag.tags
    
                    const candidateSong = {
                        title, 
                        artist, 
                        album, 
                        genre,
                        track_number: track,
                        release_year: year,
                        path: file.path
                    }
    
                    const song = await SongModel.create(candidateSong)
                },
                onError: (err) => {
                    throw new Error('Tag Error')
                }
            })

        })

        res.status(200).send('success')       
        
    } catch (err) {
        next(err)
    }
})

export default router