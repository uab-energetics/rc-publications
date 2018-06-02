import {getApp} from "../../src/app";

const request = require('supertest')

test("Publications API", async () => {

    let app = await getApp()

    // create a new repo
    let createRepoRes = await request(app)
        .post('/projects/99/pub-repos')
        .send({ displayName: 'My Test Repo 2' })

    expect(createRepoRes.statusCode).toBe(200)
    expect(createRepoRes.body.publications.length).toBe(0)

    let repoID = createRepoRes.body.id


    // insert some publications
    let addPubsRes = await request(app)
        .post(`/projects/12/pub-repos/${repoID}/publications`)
        .send({
            publications: [
                {
                    title: "The effects of something something on mice",
                    embeddingURL: "https://google.com"
                },
                {
                    title: "Man eats poptarts for breakfast every day for 5 years",
                    embeddingURL: "https://news.google.com"
                }
            ]
        })

    console.log('res body', addPubsRes.body)
    expect(addPubsRes.statusCode).toBe(200)
    expect(addPubsRes.body.publications.length).toBe(2)


    let pubIds = addPubsRes.body.publications.map( P => P.id )

    // remove some publications
    let removePubsRes = await request(app)
        .post(`/projects/${12}/pub-repos/${repoID}/publications/remove`)
        .send({
            publicationIDs: [ pubIds[1] ]
        })
    expect(removePubsRes.statusCode).toBe(200)
})
