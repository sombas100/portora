const Stripe = require('stripe');
const { User } = require('../database/models');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res) => {
    const user = req.user;

    try {
        let customerId = user.stripeCustomerId;
        if (!customerId) {
            const customer = stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: { userId: user.id }
            });

            const customerId = customer.id
            await user.update({ stripeCustomerId: customerId});
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'sunscription',
            customer: customerId,
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                }
            ],
            success_url: `${process.env.FRONTEND_URL}/billing-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/billing-cancelled`
        });

        res.json({ url: session.url })
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Stripe session failed', error: err.message });
    }
}

module.exports = { createCheckoutSession }