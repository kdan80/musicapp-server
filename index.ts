import express, { Express, Request, Response } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import config from './src/config/config'
import album from './src/routes/album'
import stream from './src/routes/stream'
import start from './src/db/connect'
import login from './src/routes/login'
import logout from './src/routes/logout'
import test from './src/routes/test'
import register from './src/routes/register'
import index from './src/routes/index'
import errorHandler from './src/middleware/errorHandler'

// Session store
const sessionStore = MongoStore.create({ mongoUrl: config.mongo.uri })
const isProduction = config.node_env === 'production'
console.log('XX isProduction: ', isProduction)

// App settings
const app: Express = express()
app.use(express.static(__dirname + '/public'))

app.use(cors({
    origin: true,
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: config.session.secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
        //secure: false,
        //sameSite: 'none'
    }
}))

if (isProduction) app.set("trust proxy", 1)

// Start the database
start()

// Routing
app.use('/', index)
app.use('/login', login)
app.use('/test', test)
app.use('/stream', stream)
app.use('/album', album)
app.use('/logout', logout)
app.use('/register', register)
app.use(errorHandler)

app.listen(config.server.port, () => console.log(`Listening on port ${config.server.port}`))