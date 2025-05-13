import Joi from "joi";

const createCourseSchema = Joi.object({
    slug: Joi.string()
        .required()
        .messages({
            "string.empty": "Slug is required."
        }),
    title: Joi.string()
        .required()
        .messages({
            "string.empty": "Title is required."
        }),
    description: Joi.string()
        .required()
        .messages({
            "string.empty": "Description is required."
        }),
    thumbnail_uri: Joi.string()
        .required()
        .messages({
            "string.empty": "thumbnail_uri is required."
        }),
});


const updateCourseSchema = Joi.object({
    slug: Joi.string()
        .optional()
        .messages({
            "string.empty": "Slug is required."
        }),
    title: Joi.string()
        .optional()
        .messages({
            "string.empty": "Title is required."
        }),
    description: Joi.string()
        .optional()
        .messages({
            "string.empty": "Description is required."
        }),
    thumbnail_uri: Joi.string()
        .optional()
        .messages({
            "string.empty": "thumbnail_uri is required."
        }),
    status: Joi.string()
        .optional().valid('draft', 'publish')
        .messages({
            "string.empty": "Status is required.",
            "any.only": "Status must be either 'draft' or 'publish'."
        }),
});


export {createCourseSchema, updateCourseSchema};