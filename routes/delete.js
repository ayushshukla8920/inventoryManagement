const express = require('express');
const router = express.Router();
const { handleDeleteProduct } = require('../controllers/delete');

router.post('/:id',handleDeleteProduct);

module.exports = router;