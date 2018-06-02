import {Repository} from "../models/Repository";
import {AppEvent} from "../../core/events/AppEvent";

export const REPO_UPDATED = 'repo.updated'

export interface RepoUpdated extends AppEvent {
    payload: Repository
}

export const repoUpdated = (repo): RepoUpdated => ({
    type: REPO_UPDATED,
    payload: repo
})
