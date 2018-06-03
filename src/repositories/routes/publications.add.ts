import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {validateBody} from "../../core/validation/schema";

import joi from 'joi'
import {PublicationSchema} from "../models/publication.schema";
import {Publication} from "../models/Publication";
import {pubsAdded} from "../events/PubsAdded";

export const addPublicationsRoute = ({dbConn, event}): Route => ({

    path: '/projects/:projectID/pub-repos/:repoID/publications',

    method: 'post',

    mapper: (req, res) => ({
        repoID: req.params.repoID,
        publications: req.body.publications
    }),

    validators: [
        validateBody({
            publications: joi.array().items(PublicationSchema)
        })
    ],

    controller: async ({repoID, publications}) => {
        // we MUST create the publication models first
        let publicationEntities = publications.map( P => dbConn.manager.create(Publication, P))
        await dbConn.manager.save(publicationEntities)

        // now, we can insert the relation
        await dbConn.createQueryBuilder()
            .relation(Repository, 'publications')
            .of(repoID)
            .add(publicationEntities)

        // emit the created event, and return the new publications
        let evnt = pubsAdded(repoID, publicationEntities)
        console.log(evnt)
        event(evnt)
        return { publications: publicationEntities }
    }

})
