const express = require('express');
const router = express.Router();
const { createFeedback, getProjectFeedback } = require('../controllers/feedbackController');
const authenticate = require('../middleware/authMiddleware');
const clientAuthenticate = require('../middleware/clientAuthMiddleware');

router.post('/', clientAuthenticate, createFeedback);

router.get('/project/:projectId', authenticate, getProjectFeedback);

module.exports = router;