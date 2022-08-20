import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { UserError } from './user.error'

export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    
    console.error(err);
  
    if (err instanceof UserError) {
      return res.status(err.code).json(err.message);
    }
  
    return res.status(500).json('something went wrong');
  }