const restrictToPro = async (req, res, next) => {
    if (req.user.plan !== 'pro') {
        return res.status(403).json({ message: 'Chat is available to Pro subscribers only' });
    }
    next();
}

module.exports = restrictToPro;