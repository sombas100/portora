const jwt = require('jsonwebtoken');
const { User, Client } = require('../database/models');

const eitherAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findByPk(decoded.id);
    if (user) {
      req.user = user;
      return next();
    }

   
    const client = await Client.findByPk(decoded.id);
    if (client) {
      req.client = client;
      return next();
    }

    return res.status(401).json({ message: 'Invalid token — user not found' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = eitherAuth;
