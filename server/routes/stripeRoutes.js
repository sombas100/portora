const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { createCheckoutSession, getSubscriptionStatus, cancelSubscription } = require('../controllers/stripeController');

router.get('/status', authenticate, getSubscriptionStatus);
router.post('/create-checkout-session', authenticate, createCheckoutSession);
router.post('/cancel-subscription', authenticate, cancelSubscription);

module.exports = router;