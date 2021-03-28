const express = require('express');
const { getFruit, createFruit } = require('../controllers/fruit');

const router = express.Router();

router.route('/').post(createFruit);

router.route('/:id').get(getFruit);

module.exports = router;
