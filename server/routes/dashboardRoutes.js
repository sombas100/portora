const express = require('express');
const router = express.Router();
const { summary, getProjectActivity, getClientDistribution } = require('../controllers/dashboardController')
const authenticate = require('../middleware/authMiddleware');

router.get('/summary', authenticate, summary);

// router.get('/project-activity', authenticate, getProjectActivity);
// router.get('/client-distribution', authenticate, getClientDistribution);

module.exports = router;