import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {validateExists} from "../../core/validation/exists";
import {repoDeleted} from "../events/RepoDeleted";

export const deleteRepoRoute = ({dbConn, event}): Route => ({

    path: '/projects/:projectID/pub-repos/:id',

    method: 'delete',

    mapper: (req, res) => ({
        repoID: req.params.id,
        projectID: req.params.projectID
    }),

    validators: [
        validateExists(dbConn)('id', 'id', Repository)
    ],

    controller: async ({repoID, projectID}) => {
        await dbConn.manager.delete(Repository, repoID)
        event(repoDeleted(repoID))
        return {
            msg: 'Repo deleted',
            repoID
        }
    }
})
