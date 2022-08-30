import mongoose from 'mongoose'
import { SongSchema } from './audio.song.model'

interface IAlbum {
    title: string,
    artist: string,
    featured_artists?: string[],
    track_listing?: typeof mongoose.Types.ObjectId[],
    duration: number,
    genre: string,
    release_year: number,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
export const AlbumSchema = new mongoose.Schema<IAlbum>({
    
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
        required: false
    },

    track_listing: {
        type: [mongoose.Types.ObjectId],
        ref: 'Song'
    },

    duration: {
        type: Number,
        required: true,
        default: 0
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

    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// Unique together artist/album title
AlbumSchema.index({ title: 1, artist: 1}, { unique: true })

// Hash the incoming password before we save it
// AlbumSchema.pre('save', function(next){
//     this.duration = this.track_listing.length * 1000
//     next()
// })

// Compile a model from our schema. This will be used to construct documents and read from documents
export const AlbumModel = mongoose.model<IAlbum>('Album', AlbumSchema)
