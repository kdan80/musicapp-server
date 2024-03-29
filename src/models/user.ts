import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from './user.config'

interface IUser {
    username: string,
    password: string,
    createdAt: Date,
    isAdmin: boolean,
    isGuest: boolean,
    email: string
}

// Define a schema ie the shape a document will take in the db
export const UserSchema = new mongoose.Schema<IUser>({
    
    username: {
        type: String,
        minlength: [
            config.username.min, 
            config.username.err_min
        ],
        maxlength: [
            config.username.max, 
            config.username.err_max
        ],
        index: true,
        unique: true,
        required: [
            true, 
            config.username.err_req
        ]
    },

    email: {
        type: String,
        minlength: [
            config.email.min, 
            config.email.err_min
        ],
        maxlength: [
            config.email.max, 
            config.email.err_max
        ],
        required: [
            true,
            config.email.err_req
        ],
        unique: true,
        validate: {
            validator: (val: string) =>  {
                const email_regex = new RegExp(config.email.regex, 'i')
                return email_regex.test(val)
            },
            message: config.email.err_val
        }
    },

    password: {
        type: String,
        minlength:[
            config.password.min, 
            config.password.err_min
        ],
        required: [
            true, 
            config.password.err_req
        ],
        validate: {
            validator: (val: string) =>  {
                const password_regex = new RegExp(config.password.regex)
                return password_regex.test(val)
            },
            message: config.password.err_val
        }
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    isGuest: {
        type: Boolean,
        default: false
    }
})

// Hash the incoming password before we save it
UserSchema.pre('save', async function(next){

    const user = this
    if (!user.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        return next()
    } catch (err: any) {
        return next(err)
    }
})

// Compile a model from our schema. This will be used to construct documents and read from documents
const User = mongoose.model<IUser>('User', UserSchema)

export default User