const ensureVerifiedClient = (req, res, next) => {
    if (!req.client.emailVerifed) {
        return res.status(403).json({ message: 'Please verify your email before accessing this feature' })
    }
    next();
}

module.exports = ensureVerifiedClient;