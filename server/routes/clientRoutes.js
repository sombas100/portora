const express = require('express');
const router = express.Router();
const { getAllClients, getClientById, createClient, deleteClient } = require('../controllers/clientController');
const authenticate = require('../middleware/authMiddleware');
const clientAuthenticate = require('../middleware/clientAuthMiddleware')

router.get('/', authenticate, getAllClients);
router.get('/:id', authenticate, getClientById);
router.post('/', authenticate, createClient);
router.delete('/:id', authenticate, deleteClient);

router.get('/me', clientAuthenticate, (req, res) => {
    res.json({ client: req.client })
})

module.exports = router