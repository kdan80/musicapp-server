import express, { Request, Response } from 'express'
import config from '../config'
import { permitted_methods } from '../middleware/user.middleware'
import { superfluous_logout } from '../middleware/user.logout.middleware'

const router = express.Router()

// Logout Middlewares
router.use('/', 
    permitted_methods(['POST']),
    superfluous_logout,
)

// Express automatically passes errors to next() with synchronous routers
router.post('/', ( req: Request, res: Response ) => {

    req.session.destroy(err => {
        if (err) throw new Error('LOGOUT_ERROR')
        return res.status(200).send(config.logout.msg_200_success)
    })

})

export default router
