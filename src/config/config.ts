import { S3 } from 'aws-sdk'
import * as dotenv from 'dotenv'
dotenv.config()

interface Mongo {
    options: {
        useUnifiedTopology?: boolean
        useNewUrlParser?: boolean
        useCreateIndex?: boolean
        socketTimeoutMS?: number
        keepAlive?: boolean
        poolSize?: number
        autoIndex?: boolean
        retryWrites?: boolean
    }
    uri: string
}

interface Server {
    port: number
    client_domain: string
}

interface Session {
    secret: string
}

interface S3Store {
    bucket: string
    access_key: string
    secret_key: string
    cf_access_key: string
    cf_private_key: string
    cf_url: string
}

interface Config {
    mongo: Mongo
    server: Server
    session: Session
    s3store: S3Store
    node_env: string
}

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: true
};

const MONGO: Mongo = {
    options: MONGO_OPTIONS,
    uri: process.env.MONGODB_URI
}

const SERVER: Server = {
    port: process.env.PORT,
    client_domain: process.env.CLIENT_DOMAIN
}

const SESSION: Session = {
    secret: process.env.SESSION_SECRET
}

const S3STORE: S3Store = {
    bucket: process.env.AWS_BUCKET,
    access_key: process.env.AWS_ACCESS_KEY,
    secret_key: process.env.AWS_SECRET_KEY,
    cf_access_key: process.env.CF_ACCESS_KEY,
    cf_private_key: process.env.CF_PRIVATE_KEY,
    cf_url: process.env.CF_URL
}

const config: Config = {
    mongo: MONGO,
    server: SERVER,
    session: SESSION,
    s3store: S3STORE,
    node_env: process.env.NODE_ENV
}

export default config;
