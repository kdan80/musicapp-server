import express, { Request, Response, NextFunction } from 'express'
import { UserModel }  from '@users'
import bcrypt from 'bcrypt'
import config from '../config'

const router = express.Router()

// Middleware for rejecting inappropriate HTTP requests
router.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (!['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return res.status(405).send(config.login.err_405_not_allowed)
    return next()
})

// Middleware for detecting and handling if user is already logged in
router.use('/', (req: Request, res: Response, next: NextFunction) => {
    if(req.session && req.session.isAuthenticated) return res.status(200).send(config.login.msg_200_superfluous)
    return next()
});

router.post('/', async( req: Request, res: Response ) => {

    const {email, password} = req.body

    const user = await UserModel.findOne({email})
    if(!user) return res.status(401).send(config.login.err_fail)
    
    const userIsAuthenticated = await bcrypt.compare(password, user.password)
    if(!userIsAuthenticated) return res.status(401).send(config.login.err_fail)

    req.session._id = user._id
    req.session.email = email
    req.session.username = user.username
    req.session.message = config.login.msg_200_success
    req.session.isAuthenticated = true

    return res.status(200).send(config.login.msg_200_success)
});

export default router