import mongoose, { Schema} from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';

interface IBaseUser {
    username: string,
    password: string,
    createdAt: Date,
    isAdmin: boolean,
    email: string;
}

// Define a schema ie the shape a document will take in the db
const baseUserSchema = new Schema<IBaseUser>({
    username: {
        type: String,
        minlength: 5,
        maxlength: 20,
        index: true,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 254,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Hash the incoming password before we save it
baseUserSchema.pre("save", async function(next){

    const user = this;
    if (!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return next();
    } catch(err: any) {
      return next(err);
    }
});

// Compile a model from our schema. This will be used to construct documents and read from documents
const BaseUser = mongoose.model('User', baseUserSchema);

const validateUser = (user: any) => {

    const schema = Joi.object({
        username: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(3).max(254).required(),
        password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
            .required(), 
      });
    
      return schema.validateAsync(user);
};

const User = {
    BaseUser,
    validateUser
} 

export default User;