

export const PUBS_ADDED = 'publications.added'


export const pubsAdded = (repoID, publications) => ({
    type: PUBS_ADDED,
    payload: {
        repoID,
        publications
    }
})
