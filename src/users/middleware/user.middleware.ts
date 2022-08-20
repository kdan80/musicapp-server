import { Request, Response, NextFunction } from 'express'

// Middleware for setting permitted methods. Returns 405 status code for unpermitted http request methods
export const permitted_methods = (whitelist: string[], message: string) => {

    return (req: Request, res: Response, next: NextFunction) => {
        if (!whitelist.includes(req.method)) return res.status(405).send(message)
        return next()
    }
};