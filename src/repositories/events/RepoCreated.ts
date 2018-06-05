import {Repository} from "../models/Repository";
import {AppEvent} from "../../core/events/AppEvent";

export const REPO_CREATED = 'repo.created'

export const repoCreated = (repo: Repository): AppEvent<Repository> => ({
    type: REPO_CREATED,
    payload: repo
})