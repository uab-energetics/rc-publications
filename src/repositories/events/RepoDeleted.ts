import {AppEvent} from "../../core/events/AppEvent";

export const REPO_DELETED = 'repo.deleted'

export interface RepoDeleted {
    repoID: string
}

export const repoDeleted = (repoID: string): AppEvent<RepoDeleted> => ({
    type: REPO_DELETED,
    payload: {
        repoID
    }
})