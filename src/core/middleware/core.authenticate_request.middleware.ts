import { Request, Response, NextFunction } from 'express'

const authenticate_request = ( req: Request, res: Response, next: NextFunction ) => {

    if (!req.session.isAuthenticated)  throw new Error('NOT_AUTHENTICATED');
    next();
}

export default authenticate_request