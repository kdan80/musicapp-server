import express from 'express'
import register from './user.register.router'
import login from './user.login.router'
import logout from './user.logout.router'

const router = express.Router();

router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register)

export default router;