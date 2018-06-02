import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import {getConfigHelper} from "./core/config/helper";
import {getConfig} from "./_config";
import {connectToRabbitMQ} from "./core/messaging/connect";
import {httpErrorHandler} from "./core/errors/httpErrorHandler";
import {connectToDB} from "./core/database/connect";
import {useRoute} from "./core/routing/route-builder";
import {createRepoRoute} from "./repositories/routes/repo.create";
import {deleteRepoRoute} from "./repositories/routes/repo.delete";

/**
 * COMPOSITION ROOT
 * ========================
 */
export const getApp = async () => {

    // load environment and config
    dotenv.config({ path: ".env" })
    const config = getConfigHelper(getConfig(process.env))

    // connect to message broker
    let { channel, connection } = await connectToRabbitMQ({ config })

    // connect to mysql database
    const dbConn = await connectToDB({ config })

    // bootstrap express application
    const app = express()
    app.set('port', config('port'))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan('dev'))

    useRoute(app, createRepoRoute({ dbConn, events: app }))
    useRoute(app, deleteRepoRoute({ dbConn, events: app }))

    app.use(httpErrorHandler)
    app.use((err, _, __, ___) => console.error('unhandled error: ', err))

    app.on('created-repo', data => console.log('App Event: ', data))
    app.on('deleted-repo', data => console.log('App Event: ', data))

    return app
}
