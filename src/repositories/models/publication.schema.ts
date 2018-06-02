const joi = require('joi')

export const PublicationSchema = {
    embeddingURL: joi.string().required(),
    title: joi.string().required()
}