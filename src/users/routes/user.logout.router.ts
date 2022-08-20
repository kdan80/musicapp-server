import express, { Request, Response, NextFunction } from 'express'
import config from '../config'

const router = express.Router()

router.use('/', (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.isAuthenticated) return res.status(401).send(config.logout.err_fail)
    next()
})

router.post('/', (req: Request, res: Response) => {
    try {
            req.session.destroy((err) => {
            if (err) return res.send(err)
            return res.status(200).send(config.logout.msg_success)
        })
    } catch (err) {
        return res.send(err)
    }
})

export default router
