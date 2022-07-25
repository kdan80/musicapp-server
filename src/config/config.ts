interface Mongo {
    uri: string
}

interface Server {
    port: string
}

interface Session {
    secret: string
}

interface Config {
    mongo: Mongo,
    server: Server,
    session: Session,
    node_env: string
}

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGODB_URI = process.env.MONGODB_URI ?? '';

const MONGO: Mongo = {
    //options: MONGO_OPTIONS,
    uri: MONGODB_URI
}

const SERVER_PORT = process.env.PORT ?? '';

const SERVER: Server = {
    port: SERVER_PORT
}

const SESSION_SECRET = process.env.SESSION_SECRET ?? '';

const SESSION: Session = {
    secret: SESSION_SECRET
}

const config: Config = {
    mongo: MONGO,
    server: SERVER,
    session: SESSION,
    node_env: process.env.NODE_ENV ?? ''
}

export default config;
