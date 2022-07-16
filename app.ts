import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { stream, playlist, createSong } from '@routes';
import { json } from 'stream/consumers';

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use('/createSong', createSong);
app.use('/playlist', playlist);
app.use('/stream', stream);

export default app;