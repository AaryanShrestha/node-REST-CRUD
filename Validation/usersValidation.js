const joi = require ('joi');

const UsersSchema = joi.object({
    role: joi.string()
        .valid('admin', 'customer', 'vendor'),

    userName: joi.string()
        .min(3)
        .max(20)
        .required(true)
        .trim(true),

    email: joi.string()
        .unique(true)
        .required(true)
        .lowercase(true)
        .trim(true)
        .email({ mainDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{10,30}$')),

    confirmPassword: joi.ref('password'),

    gender: joi.string()
        .min(10)
        .max(10),
});

const usersValidation = (req, res, next) => {
    const userObject = req.body;
    const {err} = UsersSchema.validate(userObject);
    if(!err){
        next()
    }
    else{
        res.json(err.message);
    };
};

module.exports = usersValidation;