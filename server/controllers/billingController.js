const { Client } = require('../database/models');

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
                remaining
            }
        })
    } catch (error) {
        res.status(500).json({
        message: 'Could not retrieve billing info',
        error: error.message
    });
    }
}

module.exports = { getBillingStatus }