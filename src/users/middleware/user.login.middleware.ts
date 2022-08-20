import { Request, Response, NextFunction } from 'express'
import config from '../config';

// Middleware for setting permitted methods. Returns 405 status code for unpermitted http request methods
export const permitted_methods = (whitelist: string[], message: string) => {

    return (req: Request, res: Response, next: NextFunction) => {
        if (!whitelist.includes(req.method)) return res.status(405).send(message)
        return next()
    }
};

// Middleware for decting if a user is already logged in
export const superfluous_login = (req: Request, res: Response, next: NextFunction) => {
    if(req.session && req.session.isAuthenticated) return res.status(200).send(config.login.msg_200_superfluous)
    return next()
};