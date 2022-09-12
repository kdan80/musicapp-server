import { Request, Response, NextFunction } from 'express'

const authenticate_request = ( req: Request, res: Response, next: NextFunction ) => {

    // Handle cases where the user is already logged in
    if ( req.originalUrl === '/user/login' && req.session.isAuthenticated ) throw new Error('SUPERFLUOUS_LOGIN')
    if ( req.originalUrl === '/user/login' ) return next()
    
    if ( !req.session.isAuthenticated)  throw new Error('NOT_AUTHENTICATED' );
    next();

}

export default authenticate_request