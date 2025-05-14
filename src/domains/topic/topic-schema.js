import Joi from "joi";

const topicCreateSchema = Joi.object({
    course_id: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.length': 'course_id must be 24 characters',
            'string.hex': 'course_id must be a valid hex string',
            'any.required': 'course_id is required'
        }),
    slug: Joi.string()
        .required()
        .messages({
            'any.required': 'slug is required'
        }),
    title: Joi.string()
        .required()
        .messages({
            'any.required': 'title is required'
        }),
    description: Joi.string()
        .required()
        .messages({
            'any.required': 'description is required'
        }),
    thumbnail_uri: Joi.string()
        .required()
        .messages({
            'any.required': 'thumbnail_uri is required'
        }),
    video_uri: Joi.string()
        .required()
        .messages({
            'any.required': 'video_uri is required'
        }),
    price: Joi.number()
        .required()
        .messages({
            'any.required': 'price is required',
            'number.base': 'price must be a number'
        }),
});

const topicUpdateSchema = Joi.object({
    course_id: Joi.string()
        .length(24)
        .hex()
        .optional()
        .messages({
            'string.length': 'course_id must be 24 characters',
            'string.hex': 'course_id must be a valid hex string',
        }),
    slug: Joi.string()
        .optional()
        .messages({
            'string.base': 'slug must be a string'
        }),
    title: Joi.string()
        .optional()
        .messages({
            'string.base': 'title must be a string'
        }),
    description: Joi.string()
        .optional()
        .messages({
            'string.base': 'description must be a string'
        }),
    thumbnail_uri: Joi.string()
        .optional()
        .messages({
            'string.base': 'thumbnail_uri must be a string'
        }),
    video_uri: Joi.string()
        .optional()
        .messages({
            'string.base': 'video_uri must be a string'
        }),
    status: Joi.string()
        .valid('draft', 'publish')
        .optional()
        .messages({
            'any.only': "status must be either 'draft' or 'publish'"
        }),
    price: Joi.number()
        .optional()
        .messages({
            'number.base': 'price must be a number'
        }),
});

export { topicCreateSchema, topicUpdateSchema };
