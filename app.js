const express = require('express');
require('./config/databaseConfig')
const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000, (req, res, next) => {
    console.log("Server has been started.")
});