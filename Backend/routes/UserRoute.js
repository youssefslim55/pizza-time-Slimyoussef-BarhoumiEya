const express = require('express');
const {registerUser , loginUser}=require('../ccontroller/UserController');

const router = express.Router();

route.post('/register',registerUser);
router.post('/login',loginUser);

module.exports = router;
