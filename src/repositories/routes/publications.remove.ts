import {Route} from "../../core/routing/Route";
import {validateBody} from "../../core/validation/schema";

import joi from 'joi'
import {Publication} from "../models/Publication";
import {pubsRemoved} from "../events/publications";
import {Repository} from "../models/Repository";

export const removePublicationsRoute = ({ dbConn, event }): Route => ({

    path: '/projects/:projectID/pub-repos/:repoID/publications/remove',

    method: 'post',

    mapper: (req, res) => ({
        repoID: req.params.repoID,
        publicationIDs: req.body.publicationIDs
    }),

    validators: [
        validateBody({
            publicationIDs: joi.required()
        })
    ],

    controller: async ({ repoID, publicationIDs }) => {
        return await dbConn.getRepository(Publication)
            .delete(publicationIDs)
            .then( _ => event(pubsRemoved(repoID, publicationIDs)))
            .then( _ => dbConn.getRepository(Repository).findOneOrFail(repoID, { relations: ['publications']}))
    }
})
