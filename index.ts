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
import register from './src/routes/register'
import index from './src/routes/index'
import errorHandler from './src/middleware/errorHandler'

// Session store
const sessionStore = MongoStore.create({ mongoUrl: config.mongo.uri })
const isProduction = config.node_env === 'production'
const client_domain = config.server.client_domain

// App settings
const app: Express = express()
app.use(express.static(__dirname + '/public'))

app.use(cors({
    origin: config.server.client_domain,
    credentials: true
}))


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: config.session.secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    }
}))

// Start the database
start()

// Routing
app.use('/', index)
app.use('/login', login)
app.use('/stream', stream)
app.use('/album', album)
app.use('/logout', logout)
app.use('/register', register)
app.use(errorHandler)

app.listen(config.server.port, () => console.log(`Listening on ${config.server.port}`))