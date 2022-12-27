const joi = require ('joi');

const ReviewsSchema = joi.object({
    userReview: joi.string()
        .requirede(true)
});

const reviewValidation = (req, res, next) => {
    const reviewObject = req.body;
    const {err} = ReviewsSchema.validate(reviewObject);
    if(!err){
        next()
    }
    else{
        res.json(err.message);
    };
};