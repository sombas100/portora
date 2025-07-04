module.exports = (requiredPlans = ['starter', 'pro', 'enterprise']) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.subscriptionStatus) {
      return res.status(403).json({ message: 'No subscription information found.' });
    }

    if (user.subscriptionStatus !== 'active') {
      return res.status(403).json({ message: 'Subscription not active.' });
    }

    if (!requiredPlans.includes(user.plan)) {
      return res.status(403).json({ message: 'This plan does not have access to this feature.' });
    }

    next();
  };
};
