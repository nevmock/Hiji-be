import Joi from "joi";

const loginSchema = Joi.object({
    username : Joi.string()
        .required()
        .messages({
            "string.empty": "Username is required."
        }),
    password : Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required."
        })
    });

const registerSchema = Joi.object({
    name: Joi.string().required().min(4)
        .messages({
            "string.empty": "Name is required.",
            "string.min": "Name must be at least 4 characters long.",
            "string.base": "Name can only contain letters and spaces."
        }),

    username: Joi.string().required().min(4)
        .alphanum()
        .messages({
            "string.empty": "Username is required.",
            "string.min": "Username must be at least 4 characters long.",
            "string.alphanum": "Username can only contain letters and numbers."
        }),
    email : Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required.",
            "string.email": "Email must be a valid email address."
        }),
    password : Joi.string()
        .required()
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
        .messages({
            "string.empty": "Password is required.",
            "string.min": "Password must be at least 8 characters long.",
            "string.pattern.base": "Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 special character."
        }),
    phone_number: Joi.string()
        .pattern(/^\+628\d{8,}$/) // Ensures it starts with +628 and has at least 11 digits
        .required()
        .messages({
            "string.empty": "Phone number is required.",
            "string.pattern.base": "Phone number must start with +628 and be at least 11 digits long."
        }),
    address: Joi.string().required()
        .messages({
            "string.empty": "Address is required."
        })
    });
    

const profileSchema = Joi.object({
    name : Joi.string().optional().min(4)
        .messages({
            "string.empty": "Name is required.",
            "string.min": "Name must be at least 4 characters long."
    }),
    phone_number: Joi.string().optional()
        .messages({
            "string.empty": "Phone number is required.",
        }),
    })

const changePasswordSchema = Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string().required()
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
        .messages({
            "string.min": "Password must be at least 8 characters long.",
            "string.pattern.base": "Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 special character."
        }),
    confirm_password: Joi.string().valid(Joi.ref("new_password")).required()
        .messages({
            "any.only": "Passwords do not match."
        })
});

const refreshTokenSchema = Joi.object({
    refresh_token : Joi.string()
        .required()
        .messages({
            "string.empty": "Refresh token is required."
        }),
})

export { loginSchema, registerSchema, profileSchema, changePasswordSchema, refreshTokenSchema };