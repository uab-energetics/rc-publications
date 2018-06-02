import {AppEvent} from "../../core/events/AppEvent";

export const REPO_DELETED = 'repo.deleted'

export interface RepoDeleted extends AppEvent {
    payload: {
        repoID: string
    }
}

export const repoDeleted = (repoID: string): RepoDeleted => ({
    type: REPO_DELETED,
    payload: {
        repoID
    }
})