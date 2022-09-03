import { NextFunction, Request, Response } from 'express'
import { SongModel } from '../models/audio.song.model'
import { AlbumModel } from '../models/audio.album.model'
import { customAlphabet } from 'nanoid'

const create_song = async( req: Request, res: Response, next: NextFunction ) => {

    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')

    try {

        const {
            track_list
        } = req.body.info

        const candidate_songs = []
        for (const track of track_list) {
            const song = {
                nano_id: nanoid(),
                ...track,
                album: req.body.album_id,
                path: `${req.body.path}/${track.path}`
            }

            candidate_songs.push(song)
        }

        const songs = await SongModel.insertMany(candidate_songs, { ordered: false })

        // Add the newly created songs to the AlbumModel as an array of subdocuments
        const Album = await AlbumModel.findOneAndUpdate(
            { _id: req.body.album_id },    
            { track_list: songs }
        )

        if (!Album) throw new Error('ALBUM_NOT_FOUND')
        
        console.log(`track_list added to ${Album.title}`)
       
        next()

    } catch (err: any) {
        next(err)
    }
}

export default create_song