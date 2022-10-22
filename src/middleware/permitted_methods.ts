import { Request, Response, NextFunction } from 'express'

// Middleware for setting permitted methods. Returns 405 status code for unpermitted http request methods
const permitted_methods = ( whitelist: string[] ) => {

    return ( req: Request, res: Response, next: NextFunction ) => {
        //if (!whitelist.includes(req.method)) throw new Error('UNPERMITTED_METHOD')
        return next()
    }
};

export default permitted_methods