interface Mongo {
    uri: string
}

interface Server {
    port: number
    client_domain: string
}

interface Session {
    secret: string
}

interface Minio {
    end_point: string
    port: number
    bucket: string
    access_key: string
    secret_key: string
}

interface Config {
    mongo: Mongo
    server: Server
    session: Session
    minio: Minio
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
    retryWrites: false
};

const MONGO: Mongo = {
    //options: MONGO_OPTIONS,
    uri: process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI_DEV
    
}

const SERVER: Server = {
    port: process.env.PORT,
    client_domain: process.env.CLIENT_DOMAIN
}

const SESSION: Session = {
    secret: process.env.SESSION_SECRET
}

const MINIO: Minio = {
    end_point: process.env.MINIO_ENDPOINT,
    port: process.env.MINIO_PORT,
    bucket: process.env.MINIO_BUCKET,
    secret_key: process.env.MINIO_SECRET_KEY,
    access_key: process.env.MINIO_ACCESS_KEY
}

const config: Config = {
    mongo: MONGO,
    server: SERVER,
    session: SESSION,
    minio: MINIO,
    node_env: process.env.NODE_ENV
}

export default config;
