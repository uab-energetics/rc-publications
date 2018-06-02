import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {validateBody} from "../../core/validation/schema";

import joi from 'joi'
import {PublicationSchema} from "../models/publication.schema";
import {pubsAdded} from "../events/publications";

export const addPublicationsRoute = ({ dbConn, event }): Route => ({

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

    controller: async ({ repoID, publications }) => {
        let dbrepo = await dbConn.getRepository(Repository)
        return dbrepo.findOneOrFail(repoID, { relations: ['publications'] })
            .then( async repo => {
                repo.publications.push( ...publications )
                await dbrepo.save(repo)
                return repo
            })
            .then( repo => {
                event(pubsAdded(repoID, publications))
                return repo
            })
    }
})
