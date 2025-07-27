const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { getBillingStatus, downgradePlan } = require('../controllers/billingController');

router.get('/status', authenticate, getBillingStatus);
router.post('/downgrade', authenticate, downgradePlan)

module.exports = router;