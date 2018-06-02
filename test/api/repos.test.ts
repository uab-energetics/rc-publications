import {getApp} from "../../src/app";
import {create} from "domain";

const request = require('supertest')

test("Repositories API", async () => {

    let app = await getApp()

    // create a new repo
    let createres = await request(app)
        .post('/projects/12/pub-repos')
        .send({ displayName: 'My Test Repo' })
    expect(createres.statusCode).toBe(200)

    let repoID = createres.body.id

    // update the new repo
    let updateres = await request(app)
        .put('/projects/12/pub-repos/' + repoID)
        .send({ displayName: createres.body.displayName + " (updated)"})
    expect(updateres.body.displayName).toBe('My Test Repo (updated)')

    // delete the new repo
    let deleteres = await request(app)
        .delete('/projects/12/pub-repos/' + repoID)
    expect(deleteres.statusCode).toBe(200)

    // list the project repos
    let projectreposres = await request(app)
        .get('/projects/12/pub-repos/')
    expect(projectreposres.statusCode).toBe(200)

})
