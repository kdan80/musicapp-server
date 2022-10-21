import { Request, Response, NextFunction } from 'express'

const authenticate_request = ( req: Request, res: Response, next: NextFunction ) => {

    console.log('IP ADRESS: ', req.socket.remoteAddress)
    // Handle cases where the user is already logged in
    if ( req.originalUrl === '/login' && req.session.isAuthenticated ) throw new Error('SUPERFLUOUS_LOGIN')
    if ( req.originalUrl === '/login' ) return next()
    
    if ( !req.session.isAuthenticated)  throw new Error('NOT_AUTHENTICATED' );
    next();
}

export default authenticate_request