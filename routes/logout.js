const express = require('express');
const router = express.Router();
const { handleClientLogout } = require('../controllers/logout');

router.get('/',handleClientLogout);

module.exports = router;