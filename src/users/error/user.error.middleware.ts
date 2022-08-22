import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { UserError } from './user.error'

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    // If headers have already been sent we must delegate to the default express error handler
    if (res.headersSent) {
        return next(err)
    }
  
    // Mongoose code for duplicate key error
    // As username is the only unique field (other than _id) it must be the duplicate error
    if(err.code === 11000){
        return res.status(400).send('That username is unavailable')
    }
  
    
    // Otherwise we return a generic error
    return res.status(500).send(err);
  }