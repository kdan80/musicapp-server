import mongoose, { Schema, Document, PopulatedDoc, ObjectId } from 'mongoose'
import { AlbumSchema, IAlbum } from './audio.album.model'

export interface ISong {
    //_id: typeof mongoose.Schema.Types.ObjectId,
    title: string,
    artist: string,
    album: PopulatedDoc<Document<ObjectId> & IAlbum>,
    duration: number,
    track_number: number,
    genre: string,
    release_year: number,
    path: string,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
export const SongSchema = new mongoose.Schema<ISong>({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true,
    //     auto: true,
    //     required: true
    // },

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
        type: 'ObjectId', 
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
        type: String
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