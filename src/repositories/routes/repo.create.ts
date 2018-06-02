import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {RepositorySchema} from "../models/repository.schema";
import {validateBody} from "../../core/validation/schema";
import {repoCreated} from "../events/repos";
import {InsertResult} from "typeorm";

export const createRepoRoute = ({ dbConn, event }): Route => ({

    path: '/projects/:projectID/pub-repos',

    method: 'post',

    mapper: (req, res) => ({ repo: req.body, projectID: req.params.projectID }),

    validators: [
        validateBody(RepositorySchema)
    ],

    controller: async ({ repo, projectID }) => {
        let dbrepo = await dbConn.getRepository(Repository)
        return dbrepo
            .insert({ ...repo, projectID })
            .then( (insertRes: InsertResult) =>
                dbrepo.findOne(insertRes.identifiers[0].id, { relations: ['publications']})
            )
            .then( repo => {
                event(repoCreated(repo))
                return repo
            })
    }
})
