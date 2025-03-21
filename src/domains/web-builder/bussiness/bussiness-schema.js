import Joi from "joi";

const bussinessSchema = Joi.object({
    bussiness_name: Joi.string().required().min(4)
        .messages({
            "string.empty": "Bussiness name is required.",
            "string.min": "Bussiness name must be at least 4 characters long."
        }),
    phone_number: Joi.string()
        .pattern(/^\+62\d{9,13}$/)
        .required()
        .messages({
          "string.pattern.base": "Phone number must start with +62 and be between 10 to 15 digits long",
          "string.empty": "Phone number is required",
      }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required.",
            "string.email": "Email must be a valid email address."
        }),
    location_id: Joi.string()
        .required()
        .messages({
            "string.empty": "Location id is required."
        }),
    address: Joi.string().required()
        .messages({
            "string.empty": "Address is required."
        }),
    
});

export { bussinessSchema };