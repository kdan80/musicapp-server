import express, { Request, Response } from 'express'
import permitted_methods from '../middleware/permitted_methods'
import superfluous_logout from '../middleware/superfluous_logout'

const router = express.Router()

// Logout Middlewares
// router.use('/', 
//     permitted_methods(['POST']),
//     superfluous_logout,
// )

// Express automatically passes errors to next() with synchronous routers
router.post('/', ( req: Request, res: Response ) => {

    req.session.destroy(err => {
        if (err) throw new Error('LOGOUT_ERROR')
        return res.status(200).send('Logout successful')
    })

})

export default router
