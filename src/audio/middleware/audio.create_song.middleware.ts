import { NextFunction, Request, Response } from 'express'
import { SongModel } from '../models/audio.song.model'

const create_song = async( req: Request, res: Response, next: NextFunction ) => {

    try {

        const {
            track_list
        } = req.body.info

        const songs = []
        for (const track of track_list) {
            const song = {
                ...track,
                album: req.body.album,
                path: `${req.body.path}/${track.path}`
            }

            songs.push(song)
        }

        SongModel.insertMany(songs, (err) => {
            if (err) console.log(err)
        })

        next()

    } catch (err) {
        next(err)
    }
}

export default create_song