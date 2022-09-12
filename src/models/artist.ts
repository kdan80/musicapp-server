import mongoose from 'mongoose'

interface IArtist {
    name: string,
    albums: string,
    songs: string,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
const ArtistSchema = new mongoose.Schema<IArtist>({
    
    name: {
        type: String,
        required: [
            true, 
            'Name is required'
        ]
    },


    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// Compile a model from our schema. This will be used to construct documents and read from documents
const Artist = mongoose.model<IArtist>('Artist', ArtistSchema)

export default Artist