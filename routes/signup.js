const express = require('express');
const router = express.Router();
const { Signup,handleSignup } = require('../controllers/signup');

router.get('/',Signup);
router.post('/',handleSignup);

module.exports = router;