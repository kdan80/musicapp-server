import { NextFunction, Request, Response } from 'express'
import { AlbumModel } from '../models/audio.album.model'

const create_album = async( req: Request, res: Response, next: NextFunction ) => {

    try {

        const {
            title, artist, featured_artists, duration, genres, release_year, comment, number_of_discs, album_art
        } = req.body.info

        let Album = await AlbumModel.findOne({ artist: artist, title: title})
        if (!Album) {
            Album = await AlbumModel.create({
                title,
                artist,
                featured_artists,
                duration,
                genres,
                release_year,
                comment, 
                number_of_discs,
                album_art,
                path: req.body.path
            })

            console.log(`${Album.title} was created`)
        }

        req.body.album_id = Album._id

        next()

    } catch (err) {
        next(err)
    }
}

export default create_album