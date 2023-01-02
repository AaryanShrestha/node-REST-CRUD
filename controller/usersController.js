const Users = require ('../model/Users');

const getAllUser = async (req, res, next) => {
    try {
        const user = await Users.find()
        res.json({message: user})
    } catch (err) {
        console.log(err);
    }
};

module.exports = {getAllUser}