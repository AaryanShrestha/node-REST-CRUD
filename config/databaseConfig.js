const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/MyShopDatabase', ({useUnifiedTopology: true, useNewUrlParser: true}, err => {
    if (!err) {
        console.log("Database connected.")
    }else{
        console.log(err)
    }
}));