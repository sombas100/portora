const { Message } = require('../database/models');
const { Op } = require('sequelize');


const getChatHistory = async (req, res) => {
  const { participantId } = req.params;

  const isFreelancer = !!req.user;
  const isClient = !!req.client;

  try {
    let messages;

    if (isFreelancer) {
      const freelancerId = req.user.id;
      messages = await Message.findAll({
        where: {
          [Op.or]: [
            {
              senderId: freelancerId,
              receiverId: participantId,
              senderType: 'Freelancer',
              receiverType: 'Client',
            },
            {
              senderId: participantId,
              receiverId: freelancerId,
              senderType: 'Client',
              receiverType: 'Freelancer',
            },
          ],
        },
        order: [['createdAt', 'ASC']],
      });
    } else if (isClient) {
      const clientId = req.client.id;
      messages = await Message.findAll({
        where: {
          [Op.or]: [
            {
              senderId: clientId,
              receiverId: participantId,
              senderType: 'Client',
              receiverType: 'Freelancer',
            },
            {
              senderId: participantId,
              receiverId: clientId,
              senderType: 'Freelancer',
              receiverType: 'Client',
            },
          ],
        },
        order: [['createdAt', 'ASC']],
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to retrieve messages' });
  }
};


const sendMessage = async (req, res) => {
  const { content, receiverId } = req.body;

  if (!content || !receiverId) {
    return res.status(400).json({ message: 'Missing content or receiverId' });
  }

  const isFreelancer = !!req.user;
  const isClient = !!req.client;

  try {
    let newMessage;

    if (isFreelancer) {
      newMessage = await Message.create({
        senderId: req.user.id,
        receiverId,
        senderType: 'Freelancer',
        receiverType: 'Client',
        content,
      });
    } else if (isClient) {
      newMessage = await Message.create({
        senderId: req.client.id,
        receiverId,
        senderType: 'Client',
        receiverType: 'Freelancer',
        content,
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

module.exports = {
  getChatHistory,
  sendMessage,
};
