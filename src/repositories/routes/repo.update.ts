import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {RepositorySchema} from "../models/repository.schema";
import {validateBody} from "../../core/validation/schema";
import {validateExists} from "../../core/validation/exists";
import {repoUpdated} from "../events/RepoUpdated";

export const updateRepoRoute = ({ dbConn, event }): Route => ({

    path: '/projects/:projectID/pub-repos/:id',

    method: 'put',

    mapper: (req, res) => ({ id: req.params.id, repo: req.body }),

    validators: [
        validateExists(dbConn)('id', 'uuid', Repository),
        validateBody(RepositorySchema)
    ],

    controller: async ({ id, repo }) => {
        await dbConn.manager.update(Repository, id, repo)
        let repoModel = await dbConn.manager.findOneOrFail(Repository, id)
        console.log('about to dispatch..', repoUpdated(repoModel))
        event(repoUpdated(repoModel))
        return repoModel
    }
})
