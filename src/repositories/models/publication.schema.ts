const joi = require('joi')

export const PublicationSchema = {
    embeddingURL: joi.string().required(),
    title: joi.string().required(),
    sourceID: joi.string().allow('', null),
    uuid: joi.string()
}