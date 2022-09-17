interface Mongo {
    uri: string
}

interface Server {
    port: string
    client_domain: string
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
    useCreateIndex: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO: Mongo = {
    //options: MONGO_OPTIONS,
    uri: process.env.MONGODB_URI || ''
}

const SERVER: Server = {
    port: process.env.PORT || '',
    client_domain: process.env.CLIENT_DOMAIN || ''
}

const SESSION: Session = {
    secret: process.env.SESSION_SECRET || ''
}

const config: Config = {
    mongo: MONGO,
    server: SERVER,
    session: SESSION,
    node_env: process.env.NODE_ENV || ''
}

export default config;
