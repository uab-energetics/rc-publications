import {AppEvent} from "../../core/events/AppEvent";

export const PUBS_REMOVED = 'publications.removed'

export interface PubsRemoved {
    repoID: string,
    publicationIDs: number[]
}

export const pubsRemoved = (repoID, publicationIDs): AppEvent<PubsRemoved> => ({
    type: PUBS_REMOVED,
    payload: {
        repoID,
        publicationIDs
    }
})
