const express = require('express');
const {
  getAllFruit,
  getFruit,
  createFruit,
  updateFruit,
  deleteFruit,
} = require('../controllers/fruit');

const router = express.Router();

router.route('/').get(getAllFruit).post(createFruit).put(updateFruit);

router.route('/:id').get(getFruit).delete(deleteFruit);

module.exports = router;
