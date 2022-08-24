import mongoose from 'mongoose'

interface IAlbum {
    title: string,
    artist: string,
    track_listing: string[],
    tracks: number,
    duration: number,
    genre: string,
    release_year: number,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
const AlbumSchema = new mongoose.Schema<IAlbum>({
    
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
// AlbumSchema.pre('save', async function(next){

// })

// Compile a model from our schema. This will be used to construct documents and read from documents
const Album = mongoose.model<IAlbum>('Album', AlbumSchema)

export default Album