import express, { Express, Request, Response } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import { playlist, createSong, error } from '@routes'
import { UserRouter } from '@users'
import { AudioRouter } from '@audio'
import { StreamRouter } from '@stream'
import config from '@config'
import start from './src/db/connect'

// Session store
const sessionStore = MongoStore.create({ mongoUrl: config.mongo.uri })

// App settings
const app: Express = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: config.session.secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true,
        maxAge: 300000,
        secure: config.node_env === 'production',
    }
}))

start()

// Middleware
app.use(cors())
app.use(express.json())


// Routing
app.use('/createSong', createSong)
app.use('/audio', AudioRouter)
app.use('/user', UserRouter)
app.use('/error', error)
app.use('/playlist', playlist)
app.use('/stream', StreamRouter)


export default app