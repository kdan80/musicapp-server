import mongoose from 'mongoose'

interface ISong {
    title: string,
    artist: string,
    album: string,
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
        type: String,
        required: [
            true, 
            'Album is required'
        ]
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

// Hash the incoming password before we save it
// SongSchema.pre('save', async function(next){

// })

// Compile a model from our schema. This will be used to construct documents and read from documents
export const SongModel = mongoose.model<ISong>('Song', SongSchema)