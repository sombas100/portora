require('dotenv').config();
const { Client } = require('../database/models');
const jwt = require('jsonwebtoken');

const getAllClients = async (req, res) => {
    const userId = req.user.id;
    try {
        const clients = await Client.findAll({ where: { userId } })
        if (clients.length === 0) return res.status(404).json({ message: 'No clients found' });

        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clients', error: error.message });
    }
}

const getClientById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const client = await Client.findOne({ where: { id, userId } });
        if (!client) return res.status(404).json({ message: 'Client not found' });

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching client', error: error.message });
    }
}

const generateClientToken = (client) => {
    return jwt.sign(
        { clientId: client.id, email: client.email }, 
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}

const createClient = async (req, res) => {
    const { firstName, lastName, email, company } = req.body;
    const userId = req.user.id;

    try {
        const client = await Client.create({ firstName, lastName, email, company, userId });
        const token = generateClientToken(client);
        const loginUrl = `https://yourfrontend.com/client-login?token=${token}`;
        res.status(201).json({ client, loginUrl });
    } catch (error) {
        res.status(500).json({ message: 'Could not create new client', error: error.message });
    }
}

const deleteClient = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const client = await Client.findOne({ where: { id, userId } })
        if (!client) return res.status(404).json({ message: 'Client not found' });

        await client.destroy();
        res.status(204).json({ message: 'Client has successfully been deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting client', error: error.message });
    }
}


module.exports = {
    getAllClients,
    getClientById, 
    createClient,
    deleteClient,
}