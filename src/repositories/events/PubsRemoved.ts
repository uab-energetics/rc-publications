import {AppEvent} from "../../core/events/AppEvent";

export const PUBS_REMOVED = 'publications.removed'

export interface PubsRemoved extends AppEvent {
    payload: {
        repoID: string,
        publicationIDs: number[]
    }
}

export const pubsRemoved = (repoID, publicationIDs) => ({
    type: PUBS_REMOVED,
    payload: {
        repoID,
        publicationIDs
    }
})
