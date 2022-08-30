import mongoose, { Schema } from 'mongoose'
import { AlbumSchema } from './audio.album.model'

interface ISong {
    title: string,
    artist: string,
    album: typeof mongoose.Types.ObjectId,
    duration: number,
    track_number: number,
    genre: string,
    release_year: number,
    path: string,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
export const SongSchema = new mongoose.Schema<ISong>({
    
    title: {
        type: String,
        required: [
            true, 
            'Title is required'
        ]
    },

    artist: {
        type: String,
        required: [
            true, 
            'Artist is required'
        ]
    },

    album: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Album'
    },

    duration: {
        type: Number,
        required: [
            true, 
            'Duration is required'
        ],
        default: 100
    },

    track_number: {
        type: Number,
        required: [
            true, 
            'Track number is required'
        ]
    },

    genre: {
        type: String,
        required: [
            true, 
            'Genre is required'
        ]
    },

    release_year: {
        type: Number,
        required: [
            true, 
            'Release year is required'
        ]
    },

    path: {
        type: String,
        required: [
            true, 
            'Path year is required'
        ]
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// 
// SongSchema.pre('save', async function(next){

//     const { artist, album, genre, release_year } = this

//     const albumExists = await AlbumModel.findOne({ artist: artist, title: album })
//     console.log('Album exists: ', albumExists)
//     if (!albumExists) {
//         const candidateAlbum = { artist, title: album, genre, release_year }
//         console.log('creating album...')
//         await AlbumModel.create(candidateAlbum)
//         console.log(`${album} created`)
//         return next()
//     }
//     return next()
// })

// Compile a model from our schema. This will be used to construct documents and read from documents
export const SongModel = mongoose.model<ISong>('Song', SongSchema)