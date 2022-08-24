import mongoose from 'mongoose'

interface ISong {
    title: string,
    artist: string,
    album: string,
    duration: number,
    track_number: number,
    genre: string,
    release_year: number,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
const SongSchema = new mongoose.Schema<ISong>({
    
    title: {
        type: String,
        index: true,
        required: [
            true, 
            'Title is required'
        ]
    },

    artist: {
        type: String,
        index: true,
        required: [
            true, 
            'Artist is required'
        ]
    },

    album: {
        type: String,
        index: true,
        required: [
            true, 
            'Album is required'
        ]
    },

    duration: {
        type: Number,
        index: true,
        required: [
            true, 
            'Duration is required'
        ]
    },

    track_number: {
        type: Number,
        index: true,
        required: [
            true, 
            'Track number is required'
        ]
    },

    genre: {
        type: String,
        index: true,
        required: [
            true, 
            'Genre is required'
        ]
    },

    release_year: {
        type: Number,
        index: true,
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

// Hash the incoming password before we save it
// SongSchema.pre('save', async function(next){

// })

// Compile a model from our schema. This will be used to construct documents and read from documents
const Song = mongoose.model<ISong>('Song', SongSchema)

export default Song