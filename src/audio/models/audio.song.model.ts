import mongoose, { Schema, Document, PopulatedDoc, ObjectId } from 'mongoose'
import { IAlbum } from './audio.album.model'
import { customAlphabet } from 'nanoid'

export interface ISong {
    nano_id: string,
    title: string,
    artist: string,
    featured_artists: [string],
    album: PopulatedDoc<Document<ObjectId> & IAlbum>,
    track_number: number,
    disc_number: number,
    duration: number,
    genres: [string],
    release_year: number,
    path: string,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
export const SongSchema = new Schema<ISong>({

    nano_id: {
        type: String,
        index: true,
        required: true,
    },

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

    featured_artists: {
        type: [String],
        required: true
    },

    album: { 
        type: 'ObjectId', 
        ref: 'Album'
    },

    disc_number: {
        type: Number,
        default: 1
    },

    duration: {
        type: Number,
        required: [
            true, 
            'Duration is required'
        ]
    },

    track_number: {
        type: Number,
        required: [
            true, 
            'Track number is required'
        ]
    },

    genres: {
        type: [String],
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

SongSchema.index({ title: 1, artist: 1}, { unique: true })


SongSchema.pre('save', async function(next){

    // We don't want to use mongo._id in the api/axios requests so use nanoid instead
    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
    const nano_id = nanoid()
    this.nano_id = nano_id
    


    return next()
})

// Compile a model from our schema. This will be used to construct documents and read from documents
export const SongModel = mongoose.model<ISong>('Song', SongSchema)