const express = require('express');
const router = express.Router();
const { handleUpdateProduct } = require('../controllers/update');
router.post('/:id', handleUpdateProduct);
module.exports = router;
