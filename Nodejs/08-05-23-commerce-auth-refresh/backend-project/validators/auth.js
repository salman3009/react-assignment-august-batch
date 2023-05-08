const Joi = require('joi');

const registerValidation = (data)=>{
    const schema = Joi.object().keys({
        name:Joi.string().min(4).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

const loginValidation =(input)=>{
    const schema = Joi.object().keys({
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    });
    return schema.validate(input);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;