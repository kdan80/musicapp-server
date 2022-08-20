import { Request, Response, NextFunction } from 'express'
import config from '../config'

// Middleware for detecting if a user is already logged out
export const superfluous_logout = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.isAuthenticated) return res.status(401).send(config.logout.err_fail)
    next()
}