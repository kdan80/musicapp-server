import 'express-session';

declare module 'express-session' {
    interface SessionData {
        _id: string,
        email: string,
        username: string,
        message: string,
        isAuthenticated: boolean
    }
}