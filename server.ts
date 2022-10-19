import http from 'http';
import https from 'https'
import app from './app';
import config from '@config';

const credentials = {key: 'privateKey', cert: 'certificate'};

const server = (config.node_env === 'production')
  ? https.createServer(credentials, app)
  : http.createServer(app)

server.listen(config.server.port, () => {
  //console.log(`musicapp-server is running on port ${config.server.port}...`);
});