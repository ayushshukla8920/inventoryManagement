const express = require('express');
const router = express.Router();
const { addProductToInventory } = require('../controllers/addProduct');

router.post('/',addProductToInventory);

module.exports = router;