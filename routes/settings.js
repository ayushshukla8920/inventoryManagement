const express = require('express');
const router = express.Router();
const { handleSettingsRender,handleSettingsUpdate } = require('../controllers/settings');

router.get('/',handleSettingsRender);
router.post('/',handleSettingsUpdate);

module.exports = router;