const express = require('express');
const router = express.Router();
const { getActivities, addActivity, deleteActivity } = require('../controllers/activityController');
const protect = require('../middleware/auth');

router.use(protect);
router.get('/', getActivities);
router.post('/', addActivity);
router.delete('/:id', deleteActivity);

module.exports = router;
