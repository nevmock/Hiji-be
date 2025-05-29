import Joi from "joi";



const lectureCreateSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'any.required': 'name is required',
            'string.base': 'name must be a string'
    }),

    current_job_position: Joi.string()
        .required()     
        .messages({
            'any.required': 'current_job_position is required',
            'string.base': 'current_job_position must be a string'
    }),

    company: Joi.string()
        .required()
        .messages({
            'any.required': 'company is required',
            'string.base': 'company must be a string'
    }),
});

const lectureUpdateSchema = Joi.object({
    name: Joi.string()
        .optional()
        .messages({
            'string.base': 'name must be a string'
    }),

    current_job_position: Joi.string()
        .optional()
        .messages({
            'string.base': 'current_job_position must be a string'
    }),

    company: Joi.string()
        .optional()
        .messages({
            'string.base': 'company must be a string'
    }),
});

export { lectureCreateSchema, lectureUpdateSchema };