import http from 'http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  process.stdout.write(`musicapp-server running on port ${process.env.PORT}...\n`);
});