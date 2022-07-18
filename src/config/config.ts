interface Mongo {
    uri: string
}

interface Server {
    port: string
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

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config;
