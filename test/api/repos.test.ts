import {getApp} from "../../src/app";

const request = require('supertest')

test("Repositories API", async () => {

    let app = await getApp()

    let res = await request(app)
        .post('/projects/12/pub-repos')
        .send({ displayName: 'My Test Repo' })

    expect(res.statusCode).toBe(200)

    // delete the new repo
    let deleteres = await request(app)
        .delete('/projects/12/pub-repos/' + res.body.uuid)
    console.log(deleteres.body)
    expect(deleteres.statusCode).toBe(200)
})