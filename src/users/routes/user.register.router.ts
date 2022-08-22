import express, { Request, Response, NextFunction } from 'express'
import { permitted_methods } from '../middleware/user.middleware'
import { UserModel } from '@users'
import config from '../config'

const router = express.Router()

// Middleware
router.use(
    permitted_methods(['POST'], config.register.err_405_not_allowed)
)

router.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body

        const candidateUser = {
            username,
            email,
            password
        }
        
        const user = await UserModel.create(candidateUser)

        return res.status(201).json(user)
    } catch(err: any){
        next(err)
    }

})

export default router