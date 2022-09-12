import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

interface ClientResponse {
    status: number
    name: string
    message: string
}

const errorHandler: ErrorRequestHandler = ( err, req: Request, res: Response, next: NextFunction ) => {
    // If headers have already been sent we must delegate to the default express error handler
    if (res.headersSent) {
        return next(err)
    }
  
    const clientResponse: ClientResponse = {
        status: 500,
        name: 'Error',
        message: err.message || 'GENRERIC_ERROR'
    }

    return res.status(clientResponse.status).json(clientResponse)
}

export default errorHandler