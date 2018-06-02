import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {RepositorySchema} from "../models/repository.schema";
import {validateBody} from "../../core/validation/schema";
import {repoCreated} from "../events/repos";

export const createRepoRoute = ({ dbConn, event }): Route => ({

    path: '/projects/:projectID/pub-repos',

    method: 'post',

    mapper: (req, res) => ({ repo: req.body, projectID: req.params.projectID }),

    validators: [
        validateBody(RepositorySchema)
    ],

    controller: async ({ repo, projectID }) => {
        repo.projectID = projectID
        let repoModel = dbConn.manager.create(Repository, repo)
        await dbConn.manager.save(repoModel)
        event(repoCreated(repo))
        return repoModel
    }
})
