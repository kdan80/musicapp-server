import { connect } from 'mongoose'
import config from '../../src/config/config'

const start = async() => {
    try {
        //await connect(config.mongo.uri)
        await connect('mongodb://127.0.0.1/musicapp')
        console.log('Connected to mongodb...')
    }
    catch(error: any){
        console.log('Couldn\'t connect to mongodb, exiting...')
        console.log(error)
        process.exit(1)
    }
};

export default start