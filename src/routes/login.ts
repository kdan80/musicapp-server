import express, { Request, Response } from 'express';
import { User } from '@models';
import bcrypt from 'bcrypt';

const router = express.Router();


// router.use("/", (req, res, next) => {
//     if(req.session && req.session.isAuthenticated) return res.redirect("/dashboard");
//     next();
// });

router.get("/", (req, res) => {
    try {
        return res.redirect("/")
    } catch(err) {
        return res.send(err);
    }
});

router.post("/", async(req: Request, res: Response) => {

    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).send("Username or password was incorrect");
    
    const userIsAuthenticated = await bcrypt.compare(password, user.password);
    if(!userIsAuthenticated) return res.status(401).send("Username or password was incorrect");


    req.session._id = user._id;
    req.session.email = email;
    req.session.username = user.username;
    req.session.message = "Login successful";
    req.session.isAuthenticated = true;

    return res.status(200).send("success");
});

export default router;