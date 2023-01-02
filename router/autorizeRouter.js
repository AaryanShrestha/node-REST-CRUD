const express = require ('express');
const {register, login, tokenValidation} = require ('../controller/authorizeController');

const router = express();

router.post('/register', register);
router.post('/login', login)
// router.post('/token', tokenValidation)
module.exports = router;