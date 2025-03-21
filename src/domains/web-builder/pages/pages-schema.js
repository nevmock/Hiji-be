import Joi from "joi";

const paramsSchema = Joi.object({
    bussiness_id: Joi.string()
        .required()
        .messages({
            "string.empty": "Bussiness id is required."
        }),
    id: Joi.string()
        .optional()
        .messages({
            "string.empty": "Id is required."
        }),
});

const pagesSchema = Joi.object({
    bussiness_id: Joi.string()
        .required()
        .messages({
            "string.empty": "Bussiness id is required."
        }),
});

const updatePagesSchema = Joi.object({
    bussiness_id: Joi.string()
        .required()
        .messages({
            "string.empty": "Bussiness id is required."
        }),
    id: Joi.string()
        .required()
        .messages({
            "string.empty": "Id is required."
        }),
    slug: Joi.string()
        .required()
        .messages({
            "string.empty": "Slug is required."
        }),
    html: Joi.string()
        .required()
        .messages({
            "string.empty": "Html is required."
        }),
    css: Joi.string()
        .required()
        .messages({
            "string.empty": "Css is required."
        }),
    grapes_config: Joi.object()
        .required()
        .messages({
            "string.empty": "Grapes config is required."
        }),
    
})

export { paramsSchema, pagesSchema, updatePagesSchema };