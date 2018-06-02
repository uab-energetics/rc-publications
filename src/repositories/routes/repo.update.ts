import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {RepositorySchema} from "../models/repository.schema";
import {validateBody} from "../../core/validation/schema";
import {makeRepo} from "../factories/make.repo";
import {validateExists} from "../../core/validation/exists";

export const updateRepoRoute = ({ dbConn, events }): Route => ({

    path: '/projects/:projectID/pub-repos/:id',

    method: 'put',

    mapper: (req, res) => ({ id: req.params.id, repo: req.body }),

    validators: [
        validateExists(dbConn)('id', 'uuid', Repository),
        validateBody(RepositorySchema)
    ],

    controller: async ({ id, repo }) => {
        let dbrepo = await dbConn.getRepository(Repository)
        return dbrepo
            .update(id, repo)
            .then( _ => dbrepo.findOne(id))
            .then( repo => {
                events.emit('updated-repo', repo)
                return repo
            })
    }
})
