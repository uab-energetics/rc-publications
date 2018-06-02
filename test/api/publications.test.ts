import {getApp} from "../../src/app";

const request = require('supertest')

test("Publications API", async () => {

    let app = await getApp()

    // create a new repo
    let createRepoRes = await request(app)
        .post('/projects/12/pub-repos')
        .send({ displayName: 'My Test Repo' })
    expect(createRepoRes.statusCode).toBe(200)

    let repoID = createRepoRes.body.uuid

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

    console.log(addPubsRes.body)
    expect(addPubsRes.statusCode).toBe(200)

})
