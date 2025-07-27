const { Client, User } = require('../database/models');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const planLimits = {
    free: 1,
    starter: 3,
    pro: 5,
    enterprise: 10,
}

const getBillingStatus = async (req, res) => {
    const user = req.user;
    const userId = user.id;
    const plan = user.plan || 'free'
    const status = user.subscriptionStatus || 'inactive'
    
    try {
        const clientCount = await Client.count({ where: { userId } })
        const maxClients = planLimits[plan] ?? 0;
        const remaining = Math.max(maxClients - clientCount, 0);
        
        res.json({
            plan,
            subscriptionStatus: status,
            clients: {
                used: clientCount,
                limit: maxClients,
                remaining,
            }
        })
    } catch (error) {
        res.status(500).json({
        message: 'Could not retrieve billing info',
        error: error.message
    });
    }
}

const downgradePlan = async (req, res) => {
    try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    if (user.stripeCustomerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "active",
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        await stripe.subscriptions.del(subscriptions.data[0].id);
      }
    }

    await user.update({
      plan: "free",
      subscriptionStatus: "canceled",
    });

    return res.status(200).json({ message: "Downgraded to free plan" });
  } catch (err) {
    console.error("Free plan downgrade error:", err);
    return res.status(500).json({ message: "Failed to downgrade", error: err.message });
  }
}

module.exports = { getBillingStatus, downgradePlan }