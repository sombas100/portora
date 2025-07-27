const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const { User } = require('../database/models');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('⚠️ Stripe Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          console.log('🔍 Full session object:', session);

          const customerId = session.customer;

          const user = await User.findOne({ where: { stripeCustomerId: customerId } });
          if (!user) break;

          if (!session.subscription) {
          console.warn('No subscription found on checkout session');
          break;
        }

      
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          const priceId = subscription.items.data[0].price.id;

          
          let plan = 'starter'; 
          if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = 'pro';
          if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) plan = 'enterprise';

          console.log(`✅ Subscription completed for customer: ${customerId}`);
          console.log(`📝 Updating user ${user.email} to plan: ${plan} with status: ${subscription.status}`);
          console.log('💡 Webhook session mode:', session.mode);



          await user.update({
            subscriptionStatus: subscription.status, 
            plan: plan
          });

          break;
        }

        case 'invoice.payment_failed': {
          const customerId = event.data.object.customer;
          const user = await User.findOne({ where: { stripeCustomerId: customerId } });
          if (user) {
            await user.update({ subscriptionStatus: 'past_due' });
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const customerId = event.data.object.customer;
          const user = await User.findOne({ where: { stripeCustomerId: customerId } });
          if (user) {
            await user.update({
              subscriptionStatus: 'canceled',
              plan: 'free' 
            });
          }
          break;
        }

        case 'customer.subscription.updated': {
          const sub = event.data.object;
          const customerId = sub.customer;
          const user = await User.findOne({ where: { stripeCustomerId: customerId } });

          if (user) {
            const priceId = sub.items.data[0].price.id;
            let plan = 'starter';

            if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = 'pro';
            if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) plan = 'enterprise';

            await user.update({
              subscriptionStatus: sub.status,
              plan: plan
            });
          }

          break;
        }

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error('Webhook processing error:', err);
      res.status(500).send('Webhook handler failed');
    }
  }
);

module.exports = router
