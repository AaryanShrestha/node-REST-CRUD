const express = require ('express');

const router = express();

router.get('/getalluser', );
router.get('/getoneuser/:userid', );
router.update('updateuser/:userid', );
router.delete('deleteuser/:userid', );

module.exports = router;