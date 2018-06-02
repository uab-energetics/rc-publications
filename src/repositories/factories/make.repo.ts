const uuid = require('uuid/v4')

export const makeRepo = (body) => {
    body.uuid = uuid()
    return body
}