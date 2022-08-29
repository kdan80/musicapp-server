import { Request, Response, NextFunction } from 'express'

// Middleware for detecting if a user is already logged out
export const superfluous_logout = ( req: Request, res: Response, next: NextFunction ) => {
    if (!req.session.isAuthenticated) throw new Error('SUPERFLUOUS_LOGOUT')
    return next()
}