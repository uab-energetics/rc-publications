import {Repository} from "../models/Repository";
import {AppEvent} from "../../core/events/AppEvent";

export const REPO_CREATED = 'repo.created'

export interface RepoCreated extends AppEvent {
    payload: Repository
}

export const repoCreated = (repo: Repository): RepoCreated => ({
    type: REPO_CREATED,
    payload: repo
})