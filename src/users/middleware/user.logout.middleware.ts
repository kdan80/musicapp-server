import { Request, Response, NextFunction } from 'express'
import { UserError } from '../error/user.error'

// Middleware for detecting if a user is already logged out
export const superfluous_logout = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.isAuthenticated) return next(UserError.isNotLoggedIn())
    return next()
}