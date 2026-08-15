const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoriteController');
const protect = require('../middleware/auth');

router.use(protect);
router.get('/', getFavorites);
router.post('/:contentId', addFavorite);
router.delete('/:contentId', removeFavorite);

module.exports = router;
