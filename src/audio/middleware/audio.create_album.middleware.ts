import { NextFunction, Request, Response } from 'express'
import { AlbumModel } from '../models/audio.album.model'

const create_album = async( req: Request, res: Response, next: NextFunction ) => {

    try {

        const {
            title, artist, featured_artists, track_list, duration, genres, release_year, comment, number_of_discs, album_art
        } = req.body.info

        let album = await AlbumModel.findOne({ artist: artist, title: title})
        if (!album) {
            album = await AlbumModel.create({
                title,
                artist,
                featured_artists,
                track_list,
                duration,
                genres,
                release_year,
                comment, 
                number_of_discs,
                album_art,
                path: req.body.path
            })
        }

        req.body.album_id = album._id

        next()

    } catch (err) {
        next(err)
    }
}

export default create_album