const { Router } = require('express');
const authController = require('../controller/authController');

const router = Router();


router.post('/register', authController.create_user);

router.post('/login', authController.login_user);


module.exports = router;