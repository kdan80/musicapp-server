import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import data from './users.data.json'

interface IBaseUser {
    username: string,
    password: string,
    createdAt: Date,
    isAdmin: boolean,
    email: string;
}

// Define a schema ie the shape a document will take in the db
const baseUserSchema = new mongoose.Schema<IBaseUser>({
    username: {
        type: String,
        minlength: [5, data.username_err_min],
        maxlength: [20, data.username_err_max],
        index: true,
        required: [true, data.username_err_req]
    },
    email: {
        type: String,
        minlength: [3, data.email_err_min],
        maxlength: [254, data.email_err_max],
        required: [true, data.email_err_req],
        unique: true,
        validate: {
            validator: (val: string) =>  {
                const email_regex = new RegExp(data.email_regex, 'i');
                return email_regex.test(val)
            },
            message: data.email_err_val
        }
    },
    password: {
        type: String,
        minlength:[8, data.password_err_min],
        required: [true, data.password_err_req]
    },
    createdAt: {
        type: Date,
        default: Date.now,
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
const BaseUser = mongoose.model<IBaseUser>('User', baseUserSchema);

const validateUser = (user: IBaseUser) => {

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