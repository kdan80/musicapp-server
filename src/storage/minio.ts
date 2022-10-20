import * as Minio from 'minio'
import config from '../config/config'

// Minio
const minioClient = new Minio.Client({
    endPoint: config.minio.end_point,
    port: 9000,
    useSSL: false,
    accessKey: config.minio.access_key,
    secretKey: config.minio.secret_key
});

export default minioClient