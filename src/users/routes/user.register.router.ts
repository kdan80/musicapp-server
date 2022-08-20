import express, { Request, Response, NextFunction } from 'express'
import { permitted_methods } from '../middleware/user.middleware'
import { UserModel } from '@users'
import { UserError } from '../error/user.error'
import config from '../config'

const router = express.Router()

// Middleware
router.use(
    permitted_methods(['POST'], config.register.err_405_not_allowed)
)

router.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body

        const userAlreadyExists = await UserModel.findOne({email})
        if(userAlreadyExists) return next(UserError.userAlreadyExists)

        const candidateUser = {
            username,
            email,
            password
        }
        
        const user = await UserModel.create(candidateUser)

        return res.status(201).json(user)
    } catch(err: any){
        return res.status(404).send(err.message)
    }

})

export default router