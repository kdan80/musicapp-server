import { Request, Response, NextFunction } from 'express'
import config from '../config';

// Middleware for decting if a user is already logged in
export const superfluous_login = ( req: Request, res: Response, next: NextFunction ) => {
    if (req.session && req.session.isAuthenticated) return res.status(200).send(config.login.msg_200_superfluous)
    return next()
};