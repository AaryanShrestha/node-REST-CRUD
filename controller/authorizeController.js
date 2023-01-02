const Users = require ('../model/Users');
const bcrypt = require ('bcrypt');
const SALT = 12;
const jwt = require('jsonwebtoken');
const util = require('util');

const signinToken = id => {
    return jwt.sign({id}, "R@bbit1141", {expiresIn: '1h'});
};

const tokenResponse = (user, statuscode, res) => {  
    const token = signinToken(user._id)
    res.status(statuscode).json({
        status: "sucess",
        token: token,
        data: {
            user
        }
    })
};

const register = async(req, res, next) => {
    const registerObject = req.body
    const existingUser = await Users.findOne({ $or: [{ email: registerObject.email }, { contact: registerObject.contact }, {userName: registerObject.userName}] })
    if (existingUser) {
        return res.status(409).json("user already exist")
    }else{
        try{
            if(registerObject.password === registerObject.confirmPassword){
                registerObject.password = bcrypt.hashSync(registerObject.password, SALT)
                registerObject.confirmPassword = bcrypt.hashSync(registerObject.confirmPassword, SALT)
                const registerdUser = await new Users(registerObject).save()
                res.status(200).json({message: "user created", registerdUser})
            }else{
                 return res.status(409).json({message: "password didnt match"})
            }
    
        }catch(err){
           res.status(409).json({message: err.message})
        }
    }
}


const login = async(req, res, next) => {
    const loginObject = {
        loginType: req.body.loginType,
        password: req.body.password
    }

    if (!loginObject.loginType || !loginObject.password){
       return res.status(409).json({message: "Please fill in all the details"})
    }
    const existingUser = await Users.findOne({ $or: [{email: loginObject.loginType}, {contact: loginObject.loginType}, 
        {userName: loginObject.loginType}]}) 
    if(!existingUser){
        return res.status(409).json({message: "user doesnt exist"})
    }
    try{
        if(existingUser && bcrypt.compareSync(loginObject.password, existingUser.password)){
           tokenResponse(existingUser, 200, res)
        }else{
            return res.status(409).json({message: "either password or email didnt matched"})
        }

    }catch(err){
        res.status(409).json(err.message)
    }
};  
    
const tokenValidation = async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(' ')[1];
        console.log(token)
    }
    if(!token){
        return res.json("Need Login for this activity")
    }
    try {
        const decode = await util.promisify(jwt.verify)(token, 'R@bbit1141')
        console.log(decode)
        const user = await Users.findById(decode.id)
        if (!user) {
            return res.json("No such user")
        }
        let jwtTimeStamp = (decode.iat)
        let changeTimeStamp = parseInt(user.createdDate.getTime() / 1000, 10)
        console.log(changeTimeStamp)
        if(jwtTimeStamp < changeTimeStamp){
            return res.json("password changed please login again.")
        }
        req.user = user
        next()
    } catch (err) {
        res.json(err.message);
    }
};

const authorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.json({message: " this task cannot be performed."})
        }
        next()
    }
};

module.exports = {register, login, tokenValidation, authorization};