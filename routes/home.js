const express = require('express');
const router = express.Router();
const { handleHomePageRender } = require('../controllers/home');

router.get('/',handleHomePageRender);

module.exports = router;