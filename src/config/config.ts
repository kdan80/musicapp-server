import dotenv from 'dotenv';
dotenv.config();

interface Mongo {
    uri: string
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

const MONGO: Mongo = {
    //options: MONGO_OPTIONS,
    uri: 'mongodb://127.0.0.1/musicapp'
}

const SERVER = {
    port: process.env.PORT
}

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config;
