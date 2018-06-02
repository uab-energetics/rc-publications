import {Route} from "../../core/routing/Route";
import {Repository} from "../models/Repository";
import {validateExists} from "../../core/validation/exists";

export const deleteRepoRoute = ({dbConn, events}): Route => ({

    path: '/projects/:projectID/pub-repos/:id',

    method: 'delete',

    mapper: (req, res) => ({
        repoID: req.params.id,
        projectID: req.params.projectID
    }),

    validators: [
        validateExists(dbConn)('id', 'uuid', Repository)
    ],

    controller: async ({repoID, projectID}) => {
        return await dbConn.getRepository(Repository)
            .delete(repoID)
            .then( _ => events.emit('deleted-repo', repoID))
    }
})
