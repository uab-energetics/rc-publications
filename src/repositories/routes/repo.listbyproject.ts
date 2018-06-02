import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {validateExists} from "../../core/validation/exists";

export const listReposByProject = ({dbConn}): Route => ({

    path: '/projects/:projectID/pub-repos',

    method: 'get',

    mapper: (req, res) => ({
        projectID: req.params.projectID
    }),

    validators: [],

    controller: async ({ projectID }) => {
        return await dbConn.manager.find(Repository, { projectID })
    }
})
