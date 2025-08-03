require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'No token found, authorization denied.'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(401).json({ message: 'User not found' });
        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = authenticate;