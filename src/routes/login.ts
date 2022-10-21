import express, { NextFunction, Request, Response } from 'express'
import UserModel  from '../models/user'
import bcrypt from 'bcrypt'
import authenticate_request from '../middleware/authenticate_request'
import permitted_methods from '../middleware/permitted_methods'

const router = express.Router()

// Login Middleware
router.use('/', 
    authenticate_request,
    //permitted_methods(['PUSH', 'OPTIONS'])
);

router.post('/', async( req: Request, res: Response, next: NextFunction ) => {

    try {

        console.log('XX Login route: ', req.url )
        const { username, password } = req.body

        const user = await UserModel.findOne({username})
        if (!user) throw new Error('USER_NOT_FOUND')
        
        const userIsAuthenticated = await bcrypt.compare(password, user.password)
        if (!userIsAuthenticated) throw new Error('INCORRECT_PASSWORD')

        req.session._id = user._id
        req.session.username = username
        req.session.message = 'Login successful'
        req.session.isAuthenticated = true
        req.session.isAdmin = user.isAdmin

        console.log(`Session created for ${username}`)
        return res.status(200).send(req.session.message)

    } catch (err) {
        return next(err)
    }
});

export default router