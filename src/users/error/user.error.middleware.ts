import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

interface ClientResponse {
    status: number
    name: string
    message: string
}

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    // If headers have already been sent we must delegate to the default express error handler
    if (res.headersSent) {
        return next(err)
    }
  
    const clientResponse: ClientResponse = {
        status: 500,
        name: 'UserError',
        message: 'An error occured'
    }
    // Mongoose code for duplicate key error
    // As username is the only unique field (other than _id) it must be the duplicate error
    if (err.code === 11000) {
        return res.status(400).send('That username is unavailable')
    }

    if (err.name === 'ValidationError') {
        return res.status(400).send('User validation failed')
    }

    switch (err.message) {

        case 'UNPERMITTED_METHOD':
            clientResponse.message = 'Permission denied. Illegal operation.'
            clientResponse.status = 405
            break

        case 'INCORRECT_PASSWORD':
            clientResponse.message = 'Password was incorrect.'
            clientResponse.status = 401
            break
            
        case 'USER_NOT_FOUND':
            clientResponse.message = 'User not found.'
            clientResponse.status = 401
            break

        case 'SUPERFLUOUS_LOGOUT':
            clientResponse.message = 'Session expired.'
            clientResponse.status = 401
            break

        case 'LOGOUT_ERROR':
            clientResponse.message = 'Logout error.'
            clientResponse.status = 401
            break
            
        default:
            break
            //clientResponse = {...clientResponse, status: 500, message: 'An error occured.'}
    }
    console.log('mw err: ', err.message, err.name)

    return res.status(clientResponse.status).json(clientResponse)
  
  }