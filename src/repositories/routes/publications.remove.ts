import {Route} from "../../core/routing/Route";
import {validateBody} from "../../core/validation/schema";

import joi from 'joi'
import {Publication} from "../models/Publication";
import {pubsRemoved} from "../events/PubsRemoved";

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
        await dbConn.manager.delete(Publication, publicationIDs)
        event(pubsRemoved(repoID, publicationIDs))
        return {
            msg: 'publications removed',
            publicationIDs
        }
    }
})
