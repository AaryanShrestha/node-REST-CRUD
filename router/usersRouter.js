const express = require ('express');
const {
    tokenValidation,
    authorization
} = require('../controller/authorizeController')
const {getAllUser} = require('../controller/usersController');
const router = express();

router.get('/getalluser', tokenValidation, authorization("admin"), getAllUser);
router.get('/getoneuser/:userid', );
router.patch('updateuser/:userid', );
router.delete('deleteuser/:userid', );

module.exports = router;