const Joi = require('@hapi/joi')

const regValidation = (user) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return joiSchema.validate(user)
}

const loginValidation = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);

}

module.exports.regValidation = regValidation;
module.exports.loginValidation = loginValidation;
