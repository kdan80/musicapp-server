import { NextFunction, Request, Response } from 'express'
import AlbumModel from 'src/models/album'

const create_album = async( req: Request, res: Response, next: NextFunction ) => {

    try {
        //console.log('creating album...')

        const {
            title, artist, featured_artists, duration, genres, release_year, number_of_discs, album_art
        } = req.body.info

        let album = await AlbumModel.findOne({ artist: artist, title: title})
        if (!album) {
            album = await AlbumModel.create({
                title,
                artist,
                featured_artists,
                duration,
                genres,
                release_year,
                comment: req.body.comment, 
                number_of_discs,
                album_art: album_art ? album_art : undefined,
                path: `${req.body.artist}/${req.body.album}`
            })

            //console.log(`${album.title} was created`)
        }

        req.body.album_id = album._id

        next()

    } catch (err) {
        next(err)
    }
}

export default create_album