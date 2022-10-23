import * as Minio from 'minio'
import * as AWS from 'aws-sdk'
import config from '../config/config'

AWS.config.update({
    accessKeyId: config.s3store.access_key,
    secretAccessKey: config.s3store.secret_key,
    region: 'eu-west-2'
})

const s3Client = new AWS.S3()

export default s3Client