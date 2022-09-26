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

    switch (err.message) {

        case 'NOT_ADMIN':
            clientResponse.message = 'You must be an admin to perform that operation.'
            clientResponse.status = 403
            break

        case 'PIPELINE_ERROR':
            clientResponse.message = 'Pipeline destroyed.'
            clientResponse.status = 500
            break
        
        case 'ALBUM_NOT_FOUND':
            clientResponse.message = 'Album not found. No songs were added'
            clientResponse.status = 500
            break

        case 'REQUIRES_RANGE_HEADER':
            clientResponse.message = 'Range header not provided.'
            clientResponse.status = 416
            break

        case 'SONG_NOT_FOUND':
            clientResponse.message = 'Song Not Found.'
            clientResponse.status = 400
            break

        case 'NOT_AUTHENTICATED':
            clientResponse.message = 'Permission denied. Not authenticated'
            clientResponse.status = 401
            break

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
            clientResponse.message = 'Username or password was incorrect.'
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
            clientResponse.message = err.message || 'GENERIC_ERROR'
            clientResponse.status = 500
        
    }

    return res.status(clientResponse.status).json(clientResponse)
}

export default errorHandler