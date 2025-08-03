const restrictToPro = async (req, res, next) => {
    if (req.user.plan !== 'pro' || req.user.plan !== 'enterprise') {
        return res.status(403).json({ message: 'Chat feature is available to Pro and Enterprise subscribers only' });
    }
    next();
}

module.exports = restrictToPro;