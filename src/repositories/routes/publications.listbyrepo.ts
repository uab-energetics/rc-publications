import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";

export const listPublicationsByRepoRoute = ({ dbConn }): Route => ({

    path: '/projects/:projectID/pub-repos/:repoID/publications',

    method: 'get',

    mapper: req => req.params,

    controller: async ({ projectID, repoID }) => {
        let repo: Repository = await dbConn.manager.findOneOrFail(Repository, repoID, { relations: ['publications']})
        return repo.publications
    }
})
