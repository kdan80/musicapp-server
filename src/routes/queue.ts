import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';


const queue = express.Router();

queue.get('/', (req: Request, res: Response) => {

});

export default queue;