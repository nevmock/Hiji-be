import Joi from "joi";


const lessonCreateSchema = Joi.object({
    topic_id: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.length': 'topic_id must be 24 characters',
            'string.hex': 'topic_id must be a valid hex string',
            'any.required': 'topic_id is required'
        }),
    title: Joi.string()
        .required()
        .messages({
            'any.required': 'title is required'
        }),
    video_uri: Joi.string()
        .required()
        .messages({
            'any.required': 'video_uri is required'
        }),
});

const lessonUpdateSchema = Joi.object({
    topic_id: Joi.string()
        .length(24)
        .hex()
        .optional()
        .messages({
            'string.length': 'topic_id must be 24 characters',
            'string.hex': 'topic_id must be a valid hex string',
        }),
    title: Joi.string()
        .optional()
        .messages({
            'string.base': 'title must be a string',
        }),
    video_uri: Joi.string()
        .optional()
        .messages({
            'string.base': 'video_uri must be a string',
        }),
    status: Joi.string()
        .valid('draft', 'publish')
        .optional()
        .messages({
            'any.only': 'status must be either draft or publish',
            'string.base': 'status must be a string'
        }),
});

export {
    lessonCreateSchema,
    lessonUpdateSchema
};