import express, { Request, Response } from 'express';
import { User } from '@users';

const router = express.Router();

router.post('/', async(req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists) return res.status(400).send('Email is already taken');

        const candidateUser = {
            username,
            email,
            password
        }
        
        const user = await User.create(candidateUser);

        return res.status(201).json(user);
    } catch(err: any){
        return res.status(404).send(err.message);
    }

});

export default router;