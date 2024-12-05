const express = require('express');
const router = express.Router();
const { handleLoginRender,handleLoginValidation } = require('../controllers/login');

router.get('/',handleLoginRender);
router.post('/',handleLoginValidation);

module.exports = router;