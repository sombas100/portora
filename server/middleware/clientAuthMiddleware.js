require('dotenv').config();
const { Client } = require('../database/models');
const jwt = require('jsonwebtoken');

const clientAuthenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'No token found, authorization denied.' })
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const client = await Client.findByPk(decoded.clientId)

        if (!client) return res.status(404).json({ message: 'Client not found' });
        req.client = client
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = clientAuthenticate;