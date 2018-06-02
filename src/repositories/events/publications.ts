

export const PUBS_ADDED = 'publications.added'
export const PUBS_REMOVED = 'publications.removed'


export const pubsAdded = (repoID, publications) => ({
    type: PUBS_ADDED,
    payload: {
        repoID,
        publications
    }
})

export const pubsRemoved = (repoID, publicationIDs) => ({
    type: PUBS_REMOVED,
    payload: {
        repoID,
        publicationIDs
    }
})
