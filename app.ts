import express, { Express, Request, Response } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import config from '@config'
import album from 'src/routes/album'
import stream from 'src/routes/stream'
import start from './src/db/connect'
import login from 'src/routes/login'
import logout from 'src/routes/logout'
import register from 'src/routes/register'
import test from 'src/routes/test'
import errorHandler from 'src/middleware/errorHandler'
import Minio from 'minio'

// Session store
const sessionStore = MongoStore.create({ mongoUrl: config.mongo.uri })
const isProduction = config.node_env === 'production'
const client_domain = config.server.client_domain

// Minio

// const minioClient = new Minio.Client({
//     endPoint: '192.168.1.26',
//     port: 9001,
//     useSSL: true,
//     accessKey: 'musicapp',
//     secretKey: '@AB106SJdd11bq'
// });

// App settings
const app: Express = express()
app.use(express.static(__dirname + '/public'))
app.use(cors({
    origin: client_domain,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: config.session.secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    }
}))

start()

// Routing
app.use('/login', login)
app.use('/test', test)
app.use('/stream', stream)
app.use('/album', album)
app.use('/logout', logout)
app.use('/register', register)
app.use(errorHandler)

export default app
