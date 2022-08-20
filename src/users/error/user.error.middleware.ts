import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { UserError } from './user.error'

export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    // If headers have already been sent we must delegate to the default express error handler
    if (res.headersSent) {
        return next(err)
    }
  
    if (err instanceof UserError) {
      return res.status(err.code).json(err.message);
    }
  
    // Generic error
    return res.status(500).json('something went wrong');
  }