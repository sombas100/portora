const { Client } = require('../database/models');
const jwt = require('jsonwebtoken');

const clientLoginFromToken = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(404).json({ message: 'No token provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const client = await Client.findByPk(decoded.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        if (!client.emailVerified) {
            client.emailVerified = true;
            await client.save();
        }

        const newToken = jwt.sign(
            { id: client.id,
                 email: client.email, 
                firstName: client.firstName, 
                lastName: client.lastName, 
                company: client.company 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        )
        res.status(200).json({ 
            message: 'Client login successful',
            client: {
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                company: client.company,
                emailVerified: client.emailVerified
            },
            token: newToken
        })
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
}

module.exports = { clientLoginFromToken }