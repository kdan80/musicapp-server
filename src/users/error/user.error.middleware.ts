import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { UserError } from './user.error'

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    // If headers have already been sent we must delegate to the default express error handler
    if (res.headersSent) {
        return next(err)
    }
  
    // If we know about the error return the specific code and message
    if (err instanceof UserError) {
      return res.status(err.code).json(err.message);
    }
  
    console.error(err.stack)
    // Otherwise we return a generic error
    return res.status(500).send(err);
  }