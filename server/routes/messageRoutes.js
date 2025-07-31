const express = require('express');
const router = express.Router();
const { getChatHistory, sendMessage } = require('../controllers/messageController');
const authenticate = require('../middleware/authMiddleware');
const clientAuthenticate = require('../middleware/clientAuthMiddleware');
const restrictToPro = require('../middleware/chatMiddleware');


router.get('/history/:participantId', authenticate, getChatHistory);
router.get('/client/history/:participantId', clientAuthenticate, getChatHistory);

router.post('/send', authenticate, restrictToPro, sendMessage);
router.post('/client/send', clientAuthenticate, sendMessage);

module.exports = router;
