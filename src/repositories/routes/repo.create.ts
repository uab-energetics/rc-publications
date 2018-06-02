import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {RepositorySchema} from "../models/repository.schema";
import {validateBody} from "../../core/validation/schema";
import {makeRepo} from "../factories/make.repo";

export const createRepoRoute = ({ dbConn, events }): Route => ({

    path: '/projects/:projectID/pub-repos',

    method: 'post',

    mapper: (req, res) => ({ repo: req.body, projectID: req.params.projectID }),

    validators: [
        validateBody(RepositorySchema)
    ],

    controller: async ({ repo, projectID }) => {
        let dbrepo = await dbConn.getRepository(Repository)
        return dbrepo
            .insert(makeRepo({ ...repo, projectID }))
            .then( res => dbrepo.findOne(res.raw.insertedId))
            .then( repo => {
                events.emit('created-repo', repo)
                return repo
            })
    }
})
