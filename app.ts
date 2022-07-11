import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import queue from './src/routes/queue';

const app: Express = express();
app.use(cors());

app.use('/queue', queue);

export default app;