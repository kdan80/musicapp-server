import express, { NextFunction, Request, Response } from 'express'
import { UserModel }  from '@users'
import bcrypt from 'bcrypt'
import config from '../config'
import { permitted_methods } from '../middleware/user.middleware'
import { superfluous_login } from '../middleware/user.login.middleware'

const router = express.Router()

// Login Middleware
router.use('/', 
    permitted_methods(['POST']),
    superfluous_login
);

router.post('/', async( req: Request, res: Response, next: NextFunction ) => {

    try {

        const { username, password } = req.body

        const user = await UserModel.findOne({username})
        if (!user) throw new Error('USER_NOT_FOUND')
        
        const userIsAuthenticated = await bcrypt.compare(password, user.password)
        if (!userIsAuthenticated) throw new Error('INCORRECT_PASSWORD')

        req.session._id = user._id
        req.session.username = username
        req.session.message = config.login.msg_200_success
        req.session.isAuthenticated = true

        return res.status(200).send(config.login.msg_200_success)

    } catch (err) {
        next(err)
    }
});

export default router