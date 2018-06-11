import {REPO_CREATED} from "../events/RepoCreated";
import {REPO_DELETED} from "../events/RepoDeleted";
import {REPO_UPDATED} from "../events/RepoUpdated";
import {PUBS_ADDED, PubsAdded} from "../events/PubsAdded";
import {PUBS_REMOVED, PubsRemoved} from "../events/PubsRemoved";

export const registerRabbitListener = ({channel, eventEmitter}) => {

    // TODO - make it durable?
    channel.assertExchange( 'pub-repos',         'direct',   {durable: false})
    channel.assertExchange( 'services.events',   'topic',    {durable: false})

    let publish = (ex, key, data) =>
        channel.publish(ex, key, Buffer.from(JSON.stringify(data)))

    eventEmitter.on(REPO_CREATED, repo => {
        publish('pub-repos', 'created', repo)
    })

    eventEmitter.on(REPO_DELETED, data => {
        publish('pub-repos', 'deleted', data)
    })

    eventEmitter.on(REPO_UPDATED, data => {
        publish('pub-repos', 'updated', data)
    })

    eventEmitter.on(PUBS_ADDED, (data: PubsAdded) => {
        publish(
            'services.events',
            `pub-repos.${data.repoID}.pubs-added`,
            data
        )
    })

    eventEmitter.on(PUBS_REMOVED, (data: PubsRemoved) => {
        publish(
            'services.events',
            `pub-repos.${data.repoID}.pubs-removed`,
            data
        )
    })

}