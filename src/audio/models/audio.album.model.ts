import mongoose, { Schema } from 'mongoose'
import { SongSchema } from './audio.song.model'

export interface IAlbum {
    title: string,
    artist: string,
    featured_artists: [string],
    track_list: [typeof SongSchema],
    duration: number,
    genres: [string],
    release_year: number,
    comment: string,
    number_of_discs: number,
    album_art: string,
    path: string,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
export const AlbumSchema = new Schema<IAlbum>({

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

    featured_artists: [{
        type: String,
        required: false
    }],

    track_list: [{
        type: SongSchema,
    }],

    duration: {
        type: Number,
        required: true,
        default: 0
    },

    release_year: {
        type: Number,
        required: [
            true, 
            'Release year is required'
        ]
    },

    comment: {
        type: String,
        required: true
    },

    genres: {
        type: [String],
        required: [
            true, 
            'Genre is required'
        ]
    },

    number_of_discs: {
        type: Number,
        required: true
    },

    album_art: {
        type: String,
        default: 'default_album_art.jpg'
    },

    path: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// Unique together artist/album title
AlbumSchema.index({ title: 1, artist: 1}, { unique: true })

// Compile a model from our schema. This will be used to construct documents and read from documents
export const AlbumModel = mongoose.model<IAlbum>('Album', AlbumSchema)
