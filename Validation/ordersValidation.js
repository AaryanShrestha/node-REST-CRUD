const joi = require ('joi');

const OrdersSchema = joi.object({
    productQuantity: joi.number()
        .min(1)
});


const orderValidation =  (req, res, next) => {
    const orderObject = req.body;
    const {err} = OrdersSchema.validate(orderObject);
    if(!err){
        next();
    }
    res.json(err.message);
}

module.exports = orderValidation