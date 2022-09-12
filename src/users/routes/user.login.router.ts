import express, { NextFunction, Request, Response } from 'express'
import { UserModel }  from '@users'
import bcrypt from 'bcrypt'
import config from '../config'
import { authenticate_request, permitted_methods } from 'src/core/middleware'

const router = express.Router()

// Login Middleware
router.use('/', 
    authenticate_request,
    permitted_methods(['POST']),
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