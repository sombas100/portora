const express = require('express');
const router = express.Router();
const { getAllClients, getClientById, createClient, deleteClient } = require('../controllers/clientController');
const authenticate = require('../middleware/authMiddleware');
const clientAuthenticate = require('../middleware/clientAuthMiddleware')
const sendClientLoginEmail = require('../utils/sendClientLoginEmail');
router.get('/test-email', async (req, res) => {
  try {
    const fakeName = 'Test Client';
    const fakeEmail = 'sombas100@yahoo.com'; // use your own email here
    const loginUrl = 'https://portora.com/client-login?token=abc123';

    await sendClientLoginEmail(fakeEmail, fakeName, loginUrl);

    res.status(200).json({ message: 'Test email sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Email test failed', error: err.message });
  }
});
router.get('/', authenticate, getAllClients);
router.get('/:id', authenticate, getClientById);
router.post('/', authenticate, createClient);
router.delete('/:id', authenticate, deleteClient);

router.get('/me', clientAuthenticate, (req, res) => {
    res.json({ client: req.client })
})


module.exports = router