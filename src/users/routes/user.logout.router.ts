import express, { Request, Response, NextFunction } from 'express'
import config from '../config'
import { permitted_methods } from '../middleware/user.middleware'
import { superfluous_logout } from '../middleware/user.logout.middleware'

const router = express.Router()

// Logout Middleware
router.use('/', 
    permitted_methods(['POST'], config.logout.err_405_not_allowed),
    superfluous_logout,
)

router.post('/', ( req: Request, res: Response, next: NextFunction ) => {
    try {
            req.session.destroy((err) => {
            if (err) return res.send(err)
            return res.status(200).send(config.logout.msg_200_success)
        })
    } catch (err) {
        return res.send(err)
    }
})

export default router
