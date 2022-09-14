import { Request, Response, NextFunction } from 'express'

const is_admin = ( req: Request, res: Response, next: NextFunction ) => {

    if ( !req.session.isAdmin )  throw new Error('NOT_ADMIN' );
    next();

}

export default is_admin