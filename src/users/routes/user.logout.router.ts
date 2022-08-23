import express, { Request, Response, NextFunction } from 'express'
import config from '../config'
import { permitted_methods } from '../middleware/user.middleware'
import { superfluous_logout } from '../middleware/user.logout.middleware'

const router = express.Router()

// Logout Middleware
router.use('/', 
    permitted_methods(['POST']),
    superfluous_logout,
)

router.post('/', ( req: Request, res: Response, next: NextFunction ) => {
    try {
            req.session.destroy(err => {
                if (err) throw new Error('LOGOUT_ERROR')
                return res.status(200).send(config.logout.msg_200_success)
            })
    } catch (err) {
        return next(err)
    }
})

export default router
