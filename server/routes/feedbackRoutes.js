const express = require('express');
const router = express.Router();
const { createFeedback, getProjectFeedback } = require('../controllers/feedbackController');
const authenticate = require('../middleware/authMiddleware');
const clientAuthenticate = require('../middleware/clientAuthMiddleware');
const ensureVerifiedClient = require('../middleware/ensureVerifiedClient');

router.post('/', clientAuthenticate, createFeedback);

router.get('/projects/:projectId/feedback', authenticate, getProjectFeedback);

module.exports = router;