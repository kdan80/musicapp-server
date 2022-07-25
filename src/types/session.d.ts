import 'express-session';
import mongoose from 'mongoose';

declare module 'express-session' {
    interface SessionData {
        _id: mongoose.Types.ObjectId,
        email: string,
        username: string,
        message: string,
        isAuthenticated: boolean
    }
}