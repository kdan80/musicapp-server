import express, { NextFunction, Request, Response } from 'express'


const router = express.Router()

// Login Middleware
// router.use('/', 
//     authenticate_request,
//     permitted_methods(['POST']),
// );

router.get('/', ( req: Request, res: Response, next: NextFunction ) => {

    console.log("session cookie: ", req.session.cookie )
    console.log("other cookies: ", req.cookies)

    return res.status(200).send('test was successful')

});

export default router