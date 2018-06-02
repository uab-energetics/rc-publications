const joi = require('joi')

export const RepositorySchema = {
    displayName: joi.string().required()
}