import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import util from 'util'
import { AlbumModel, SongModel } from '@audio'
import jsmediatags from 'jsmediatags'

const router = express.Router()

interface Tags {
    title: string | undefined,
    artist: string | undefined,
    album: string | undefined,
    disc_number: string,
    track_number: string | undefined,
    duration: number,
    genre: string | undefined,
    release_year: string | undefined
}

const getID3Tags = (mp3: any) => {
    return new Promise<Tags>((resolve, reject) => {
        jsmediatags.read(mp3, {
            onSuccess: (tag) => {
                console.log(tag)

                const tags = {
                    title: tag.tags.title, 
                    artist: tag.tags.artist,
                    album: tag.tags.album,
                    disc_number: tag.tags.TPOS.data,
                    track_number: tag.tags.track,
                    duration: parseInt(tag.tags.TLEN.data),
                    genre: tag.tags.genre,
                    release_year: tag.tags.year,
                }

                resolve(tags)
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

        // Grab the array of uploaded mp3 files
        await UploadMiddleware(req, res)
        const files = req.files as Express.Multer.File[] 

        // Loop through each of the uploaded mp3's and extract the metadata and save to an array
        const songs = []
        for(let i = 0; i < files.length; i++){
            const mp3Bytes = fs.readFileSync(files[i].path)

            // Album is a string here but will be replaced with an ObjectId reference later
            const {
                title, artist, album, disc_number, track_number, duration, genre, release_year
            } = await getID3Tags(mp3Bytes)

            const song_tags = {
                title, artist, album, disc_number, track_number, duration, genre, release_year,
                path: files[i].path
            }

            songs.push(song_tags)
        }

        // Create the album if it does not already exist
        let album = await AlbumModel.findOne({ artist: songs[0].artist, title: songs[0].album})
        if (!album) {
            album = await AlbumModel.create({
                title: songs[0].album, 
                artist: songs[0].artist, 
                genre: songs[0].genre, 
                release_year: songs[0].release_year
            })
            console.log(`${songs[0].album} was created`)
        }

        // Loop through the metadata and create a song model, replace the album string with an ObjectId reference
        for await (const song of songs) {
            SongModel.create({
                ...song,
                album: album
            })
        }

        res.status(200).json(songs)       
        
    } catch (err) {
        next(err)
    }
})

export default router