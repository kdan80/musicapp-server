import http from 'http';
import app from './app';
import config from '@config';

const server = http.createServer(app);

server.listen(config.server.port, () => {
  console.log(`musicapp-server is running on port ${config.server.port}...`);
});