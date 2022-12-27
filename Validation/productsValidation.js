const joi = require ('joi');

const ProductsSchema = joi.object({
    productName: joi.string()
        .required(true)
        .unique(true),

   productPrice: joi.number()
        .required(true),

    productDescription: joi.string()
        .required(false),
});

const productValidation = (req, res, next) => {
    const productObject = req.body;
    const {err} = ProductsSchema.validate(productObject);
    if(!err){
        next()
    }
    else{
        res.json(err.message);
    };
};