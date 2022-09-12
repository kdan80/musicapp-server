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
        message: err.message || 'An error occured.'
    }

    // Mongoose code for duplicate key error = 11000
    // As username is the only unique field (other than _id) it must be the casue of the duplicate error
    if (err.code === 11000) {
        clientResponse.status = 400
        clientResponse.message = 'That user already exists'
        return res.status(400).json(clientResponse)
    }

    if (err.name === 'ValidationError') {
        clientResponse.status = 400
        clientResponse.message = err.message
        return res.status(clientResponse.status).json(clientResponse)
    }

    switch (err.message) {

        case 'TEST_ERROR':
            clientResponse.message = 'This is a test error.'
            clientResponse.status = 999
            break

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

        case 'SUPERFLUOUS_LOGIN':
            clientResponse.message = 'Already logged in.'
            clientResponse.status = 200
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
            return res.status(clientResponse.status).json(clientResponse)
    }

    return res.status(clientResponse.status).json(clientResponse)
  
  }