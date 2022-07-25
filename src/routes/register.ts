import express, { Request, Response } from 'express';
import { User } from '@users';

const router = express.Router();

router.post('/', async(req: Request, res: Response) => {
    try {
        const { BaseUser, validateUser } = User;
        const { username, email, password } = req.body;

        const userAlreadyExists = await BaseUser.findOne({email});
        if(userAlreadyExists) return res.status(400).send('Email is already taken');

        const candidateUser = await validateUser({
            username: username,
            email: email,
            password: password
        });
        const user = await BaseUser.create(candidateUser);

        // req.session.email = user.email;
        // req.session.username = user.username;
        // req.session.message = "Account created successfully";
        // req.session.isAuthenticated = true;

        return res.status(201).json(user);
    } catch(err: any){
        return res.status(404).send(err.message);
    }

});

export default router;