import {AppEvent} from "../../core/events/AppEvent";
import {Publication} from "../models/Publication";

export const PUBS_ADDED = 'publications.added'

export interface PubsAdded extends AppEvent {
    payload: {
        repoID: string
        publications: Publication[]
    }
}

export const pubsAdded = (repoID, publications) => ({
    type: PUBS_ADDED,
    payload: {
        repoID,
        publications
    }
})