const authenticate = require('./authMiddleware');
const clientAuthenticate = require('./clientAuthMiddleware');

const eitherAuth = async (req, res, next) => {
  
  await authenticate(req, res, async (err) => {
    if (!err && req.user) {
      return next(); 
    }

    
    await clientAuthenticate(req, res, (err2) => {
      if (!err2 && req.client) {
        return next(); 
      }

      
      return res.status(401).json({ message: 'Unauthorized access' });
    });
  });
};

module.exports = eitherAuth;
