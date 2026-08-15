const express = require('express');
const router = express.Router();
const { getAllContent, getContentById } = require('../controllers/contentController');
const protect = require('../middleware/auth');

router.get('/', protect, getAllContent);
router.get('/:id', protect, getContentById);

module.exports = router;
