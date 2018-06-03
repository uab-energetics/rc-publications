import {AppEvent} from "../../core/events/AppEvent";
import {Publication} from "../models/Publication";

export const PUBS_ADDED = 'publications.added'

export interface PubsAdded {
    repoID: string
    publications: Publication[]
}

export const pubsAdded = (repoID, publications): AppEvent<PubsAdded> => ({
    type: PUBS_ADDED,
    payload: {
        repoID,
        publications
    }
})