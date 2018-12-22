import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";

export const retrieveRepoRoute = ({dbConn}): Route => ({

    path: '/projects/:projectId/pub-repos/:id',

    method: 'get',

    mapper: (req, res) => ({
        id: req.params.id
    }),

    validators: [],

    controller: async ({ id }) => {
        return await dbConn.manager.findOneOrFail(Repository, id )
    }
})
