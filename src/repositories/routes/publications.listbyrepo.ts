import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {validateExists} from "../../core/validation/exists";

export const listPublicationsByRepoRoute = ({ dbConn }): Route => ({

    path: '/projects/:projectID/pub-repos/:repoID/publications',

    method: 'get',

    mapper: req => req.params,

    validators: [
        validateExists(dbConn)('repoID', 'id', Repository)
    ],

    controller: async ({ projectID, repoID }) => {
        let repo: Repository = await dbConn.manager.findOneOrFail(Repository, repoID, { relations: ['publications']})
        return repo.publications
    }
})
