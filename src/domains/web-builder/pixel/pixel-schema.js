import Joi from "joi";

const createPixelSchema = Joi.object({
    pixel_name: Joi.string().min(3).required()
        .messages({
            "string.base": "Pixel Name must be a string.",
            "string.empty": "Pixel Name is required.",
            "string.min": "Pixel Name must be at least 3 characters long.",
            "any.required": "Pixel Name is required."
        }),
    pixel_id: Joi.string().min(3).required()
        .messages({
            "string.base": "Pixel Id must be a string.",
            "string.empty": "Pixel Id is required.",
            "string.min": "Pixel Id must be at least 3 characters long.",
            "any.required": "Pixel Id is required."
        }),
});

const updatePixelSchema = Joi.object({
    pixel_name: Joi.string().min(3).optional()
        .messages({
            "string.base": "Pixel Name must be a string.",
            "string.empty": "Pixel Name is required.",
            "string.min": "Pixel Name must be at least 3 characters long.",
        }),
    pixel_id: Joi.string().min(3).optional()
        .messages({
            "string.base": "Pixel Id must be a string.",
            "string.empty": "Pixel Id is required.",
            "string.min": "Pixel Id must be at least 3 characters long.",
        }),
});


export { createPixelSchema, updatePixelSchema };