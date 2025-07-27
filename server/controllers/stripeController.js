const Stripe = require('stripe');
const { User } = require('../database/models');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const getSubscriptionStatus = async (req, res) => {
  const user = req.user;

  try {
    res.json({
      plan: user.plan,
      subscriptionStatus: user.subscriptionStatus,
    });
  } catch (error) {
    res.status(500).json({ message: 'Could not retrieve subscription info', error: error.message });
  }
};


const createCheckoutSession = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { plan } = req.body;
    const planToPriceId = {
      starter: process.env.STRIPE_PRICE_ID,
      pro: process.env.STRIPE_PRO_PRICE_ID,
      enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    };

    const priceId = planToPriceId[plan];
    if (!priceId) {
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      });
      customerId = customer.id;
      await user.update({ stripeCustomerId: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
        userId: user.id,
        plan: plan
      }
    },
      success_url: `${process.env.FRONTEND_URL}/billing-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/billing-cancelled`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Stripe session failed",
      error: error.message,
    });
  }
};

const cancelSubscription = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user || !user.stripeCustomerId) {
    return res.status(404).json({ message: "User or Stripe customer not found" });
  }

  try {
    
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return res.status(400).json({ message: "No active subscription found" });
    }

    const subscriptionId = subscriptions.data[0].id;

    
    await stripe.subscriptions.del(subscriptionId);

    res.status(200).json({ message: "Subscription canceled successfully" });
  } catch (err) {
    console.error("Cancel Subscription Error:", err);
    res.status(500).json({ message: "Could not cancel subscription", error: err.message });
  }
};



module.exports = { 
    getSubscriptionStatus,
    createCheckoutSession,
    cancelSubscription
}