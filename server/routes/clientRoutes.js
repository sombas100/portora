const express = require('express');
const router = express.Router();
const { Project } = require('../database/models')
const { getAllClients, getClientById, getClientProjectsList, createClient, deleteClient, resendLoginLink } = require('../controllers/clientController');
const { clientLoginFromToken } = require('../controllers/clientAuthController');
const authenticate = require('../middleware/authMiddleware');
const clientAuthenticate = require('../middleware/clientAuthMiddleware')
const sendClientLoginEmail = require('../utils/sendClientLoginEmail');
const checkSubscription = require('../middleware/checkSubscription');

router.get('/test-email', async (req, res) => {
  try {
    const fakeName = 'Test Client';
    const fakeEmail = 'sombas100@yahoo.com';
    const loginUrl = 'https://portora.com/client-login?token=abc123';

    await sendClientLoginEmail(fakeEmail, fakeName, loginUrl);

    res.status(200).json({ message: 'Test email sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Email test failed', error: err.message });
  }
});

router.get('/', authenticate, getAllClients);
router.get('/login-from-token', clientLoginFromToken)
router.get('/:id/projects', authenticate, getClientProjectsList);
router.get('/:id', authenticate, getClientById);
router.post('/create', authenticate, createClient);
router.delete('/:id', authenticate, checkSubscription(), deleteClient);
router.post('/:id/resend-login', authenticate, resendLoginLink);


router.get('/me', clientAuthenticate, async (req, res) => {
  try {
    const client = req.client;

    const projects = await Project.findAll({
      where: { clientId: client.id },
      attributes: ['id', 'title', 'status', 'createdAt', 'updatedAt']
    });

    res.json({
      client: {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        company: client.company
      },
      projects
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
});


module.exports = router