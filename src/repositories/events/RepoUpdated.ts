import {Repository} from "../models/Repository";
import {AppEvent} from "../../core/events/AppEvent";

export const REPO_UPDATED = 'repo.updated'

export const repoUpdated = (repo): AppEvent<Repository> => ({
    type: REPO_UPDATED,
    payload: repo
})
