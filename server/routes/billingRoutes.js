const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { getBillingStatus } = require('../controllers/billingController');

router.get('/status', authenticate, getBillingStatus);

module.exports = router;