import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { queue } from '@routes';

const app: Express = express();
app.use(cors());

app.use('/queue', queue);

export default app;