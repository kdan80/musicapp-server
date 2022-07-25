import 'express-session';
import { ObjectId } from 'mongoose';

declare module 'express-session' {
    interface SessionData {
        _id: ObjectId,
        email: string,
        username: string,
        message: string,
        isAuthenticated: boolean
    }
}