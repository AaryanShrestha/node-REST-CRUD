const express = require('express');
require('./config/databaseConfig')

const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
//authorize router
const authorizeRouter = require('./router/autorizeRouter');
app.use('/', authorizeRouter);

//user router
const userRouter = require('./router/usersRouter');
app.use('/', userRouter);

app.listen(3000, (req, res, next) => {
    console.log("Server has been started.")
});