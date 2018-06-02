

export const REPO_CREATED = 'repo.created'
export const REPO_UPDATED = 'repo.updated'
export const REPO_DELETED = 'repo.deleted'


export const repoCreated = repo => ({
    type: REPO_CREATED,
    payload: repo
})

export const repoUpdated = repo => ({
    type: REPO_UPDATED,
    payload: repo
})

export const repoDeleted = repoID => ({
    type: REPO_DELETED,
    payload: repoID
})