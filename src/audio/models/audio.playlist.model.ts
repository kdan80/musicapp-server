import mongoose from 'mongoose'
import { UserSchema } from '@users'
import { SongSchema } from './audio.song.model'

interface IPlaylist {
    name: string,
    owner: typeof UserSchema,
    track_list: [typeof SongSchema],
    duration: number,
    createdAt: Date,
}

// Define a schema ie the shape a document will take in the db
const PlaylistSchema = new mongoose.Schema<IPlaylist>({
    
    name: {
        type: String,
        required: [
            true, 
            'Name is required'
        ]
    },

    // Subdocument
    owner: {
        type: UserSchema,
        required: [
            true,
            'Owner is required'
        ]
    },

    // Subdocument
    track_list: {
        type: [SongSchema],
        required: true,
        default: []
    },

    duration: {
        type: Number,
        required: true,
        default: 0
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