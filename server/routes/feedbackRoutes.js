const express = require('express');
const router = express.Router();
const { createFeedback, getProjectFeedback } = require('../controllers/feedbackController');
const clientAuthenticate = require('../middleware/clientAuthMiddleware');
const ensureVerifiedClient = require('../middleware/ensureVerifiedClient');
const eitherAuth = require('../middleware/eitherAuth');


router.post('/', clientAuthenticate, ensureVerifiedClient, createFeedback);

router.get('/projects/:projectId/feedback', eitherAuth, getProjectFeedback);

module.exports = router;