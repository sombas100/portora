require('dotenv').config();
const { Client } = require('../database/models');
const jwt = require('jsonwebtoken');
const sendClientLoginEmail = require('../utils/sendClientLoginEmail');

const getAllClients = async (req, res) => {
    const userId = req.user.id;
    const plan = req.user.plan;

    const planLimits = {
    free: 1,
    starter: 3,
    pro: 5,
    enterprise: 10
  };
    try {
        const clients = await Client.findAll({ where: { userId } })
        const maxClients = planLimits[plan] ?? 0;
        const remainingSlots = Math.max(maxClients - clients.length, 0);
        if (clients.length === 0) return res.status(404).json({ message: 'No clients found' });

        res.status(200).json({ clients, usage: {
          used: clients.length,
          limit: maxClients,
          remaining: remainingSlots,
          plan: plan
        }});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clients', error: error.message });
    }
}

const getClientById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const client = await Client.findOne({ where: { id, userId } });
        if (!client) return res.status(404).json({ message: 'Client not found' });

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching client', error: error.message });
    }
}

const generateClientToken = (client) => {
    return jwt.sign(
        { clientId: client.id, email: client.email }, 
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}


const resendLoginLink = async (req, res) => {
  const { id } = req.params; 
  const userId = req.user.id;

  try {
    const client = await Client.findOne({ where: { id, userId } });
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const token = jwt.sign(
      { clientId: client.id, email: client.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const loginUrl = `https://yourfrontend.com/client-login?token=${token}`;
    const fullName = `${client.firstName} ${client.lastName}`;

    await sendClientLoginEmail(client.email, fullName, loginUrl);

    res.status(200).json({ message: 'New login link sent successfully', loginUrl, fullName });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send login link', error: err.message });
  }
};


const createClient = async (req, res) => {
  const { firstName, lastName, email, company } = req.body;
  const userId = req.user.id;
  const plan = req.user.plan;

  const planLimits = {
    free: 1,
    starter: 3,
    pro: 5,
    enterprise: 10
  };

  try {
    
    const currentClientCount = await Client.count({ where: { userId } });
    if (currentClientCount >= planLimits[plan]) {
      return res.status(403).json({
        message: `Your ${plan} plan allows up to ${planLimits[plan]} clients. Upgrade your plan to add more.`
      });
    }
    const existing = await Client.findOne({ where: { email, userId } });
    if (existing) return res.status(409).json({ message: 'Client with this email already exists.' });

    const client = await Client.create({ firstName, lastName, email, company, userId });

    const token = generateClientToken(client);
    const loginUrl = `https://yourfrontend.com/client-login?token=${token}`;
    const fullName = `${client.firstName} ${client.lastName}`;

    
    try {
      await sendClientLoginEmail(client.email, fullName, loginUrl);
    } catch (emailError) {
      console.warn('Client created, but failed to send email:', emailError.message);
    }

    res.status(201).json({ client, loginUrl });
  } catch (error) {
    res.status(500).json({ message: 'Could not create new client', error: error.message });
  }
};

const deleteClient = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const client = await Client.findOne({ where: { id, userId } })
        if (!client) return res.status(404).json({ message: 'Client not found' });

        await client.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting client', error: error.message });
    }
}


module.exports = {
    getAllClients,
    getClientById, 
    createClient,
    deleteClient,
    resendLoginLink,
}