import express, { Request, Response, NextFunction } from 'express'
import permitted_methods from 'src/middleware/permitted_methods'
import UserModel from 'src/models/user'

const router = express.Router()

// Middleware
router.use(
    permitted_methods(['POST'])
)

router.post('/', async( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { username, email, password } = req.body

        const candidateUser = {
            username,
            email,
            password
        }
        
        const user = await UserModel.create(candidateUser)

        return res.status(201).json(user)
    } catch (err){
        next(err)
    }

})

export default router