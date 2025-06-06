const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.Index);

router.get('/:id', controller.Show);


module.exports = router