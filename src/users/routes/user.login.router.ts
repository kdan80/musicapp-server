import express, { Request, Response } from 'express';
import { User } from '@users';
import bcrypt from 'bcrypt';
import config from '../config';

const router = express.Router();

// router.use("/", (req, res, next) => {
//     if(req.session && req.session.isAuthenticated) return res.redirect("/dashboard");
//     next();
// });

router.post("/", async( req: Request, res: Response ) => {

    const {email, password} = req.body;

    const user = await User.BaseUser.findOne({email});
    if(!user) return res.status(401).send(config.login.err_fail);
    
    const userIsAuthenticated = await bcrypt.compare(password, user.password);
    if(!userIsAuthenticated) return res.status(401).send(config.login.err_fail);

    req.session._id = user._id;
    req.session.email = email;
    req.session.username = user.username;
    req.session.message = config.login.msg_success;
    req.session.isAuthenticated = true;

    return res.status(200).send(config.login.msg_success);
});

export default router;