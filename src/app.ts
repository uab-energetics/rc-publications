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
import {updateRepoRoute} from "./repositories/routes/repo.update";
import {listReposByProject} from "./repositories/routes/repo.listbyproject";
import {getEventHelper} from "./core/events/helper";
import {REPO_CREATED, REPO_DELETED} from "./repositories/events/repos";

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

    // event helper
    const event = getEventHelper({ eventEmitter: app })

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan('dev'))

    useRoute(app, createRepoRoute({ dbConn, event }))
    useRoute(app, deleteRepoRoute({ dbConn, event }))
    useRoute(app, updateRepoRoute({ dbConn, event }))
    useRoute(app, listReposByProject({ dbConn }))

    app.use(httpErrorHandler)
    app.use((err, _, __, ___) => console.error('unhandled error: ', err))

    app.on(REPO_CREATED, data => console.log('App Event: ', data))
    app.on(REPO_DELETED, data => console.log('App Event: ', data))

    return app
}
