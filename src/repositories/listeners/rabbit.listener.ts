import {REPO_CREATED} from "../events/RepoCreated";
import {REPO_DELETED} from "../events/RepoDeleted";
import {REPO_UPDATED} from "../events/RepoUpdated";
import {PUBS_ADDED} from "../events/PubsAdded";
import {PUBS_REMOVED} from "../events/PubsRemoved";

export const registerRabbitListener = ({ eventEmitter }) => {

    eventEmitter.on(REPO_CREATED, repo => {
        console.log('dispatching repo-created.', repo)
    })

    eventEmitter.on(REPO_DELETED, data => {
        console.log('dispatching repo-deleted.', data)
    })

    eventEmitter.on(REPO_UPDATED, data => {
        console.log('dispatching repo-updated.', data)
    })

    eventEmitter.on(PUBS_ADDED, data => {
        console.log('dispatching pubs-added.', data)
    })

    eventEmitter.on(PUBS_REMOVED, data => {
        console.log('dispatching pubs-removed.', data)
    })

}