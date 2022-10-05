import * as Minio from 'minio'
import config from '@config'

// Minio
const minioClient = new Minio.Client({
    endPoint: '192.168.1.26',
    port: 9000,
    useSSL: false,
    accessKey: config.minio.access_key,
    secretKey: config.minio.secret_key
});

export default minioClient