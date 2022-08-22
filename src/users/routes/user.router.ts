import express from 'express'
import register from './user.register.router'
import login from './user.login.router'
import logout from './user.logout.router'
import test from './test'
import { errorHandler } from '../error/user.error.middleware'

const router = express.Router()

router.use('/test', test)
router.use('/login', login)
router.use('/logout', logout)
router.use('/register', register)
router.use(errorHandler)

export default router