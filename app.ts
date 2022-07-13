import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { stream, playlist } from '@routes';

const app: Express = express();
app.use(cors());

app.use('/playlist', playlist);
app.use('/stream', stream);

export default app;