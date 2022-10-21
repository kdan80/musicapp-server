import express, { NextFunction, Request, Response } from 'express'
import permitted_methods from '../middleware/permitted_methods';

const router = express.Router()

router.use('/', 
    //permitted_methods(['GET'])
);

router.get('/', ( req: Request, res: Response, next: NextFunction ) => {

    res.status(200).json({
        "message": "Welcome to the music app server api",
        "available routes": ["/album", "/stream", "/login", "/logout"]
    })
    
});

export default router