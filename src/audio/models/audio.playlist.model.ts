import mongoose from 'mongoose'

interface IPlaylist {
    name: string,
    owner: string,
    songs: string,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
const PlaylistSchema = new mongoose.Schema<IPlaylist>({
    
    name: {
        type: String,
        index: true,
        required: [
            true, 
            'Name is required'
        ]
    },

    owner: {
        type: String,
        index: true,
        required: [
            true, 
            'Owner is required'
        ]
    },


    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// Hash the incoming password before we save it
// PlaylistSchema.pre('save', async function(next){

// })

// Compile a model from our schema. This will be used to construct documents and read from documents
const Playlist = mongoose.model<IPlaylist>('Playlist', PlaylistSchema)

export default Playlist