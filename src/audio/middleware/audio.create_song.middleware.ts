import { NextFunction, Request, Response } from 'express'
import { SongModel } from '../models/audio.song.model'

const create_song = async( req: Request, res: Response, next: NextFunction ) => {

    try {

        const {
            track_list
        } = req.body.info

        for (const track of track_list){

            let song = await SongModel.findOne({ artist: track.artist, title: track.title})
            if (!song) {

                song = await SongModel.create({
                    ...track,
                    album: req.body.album_id,
                    path: `${req.body.path}/${track.path}`
                })
            }

            console.log(`${track.title}: `, song)
        }

        next()

    } catch (err) {
        next(err)
    }
}

export default create_song