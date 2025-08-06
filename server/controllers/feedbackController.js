const { Feedback, Project, Client } = require('../database/models');

const createFeedback = async (req, res) => {
    const { projectId, message } = req.body;
    const client = req.client;

    try {
        const project = await Project.findOne({ where: { id: projectId } });
        if (!project || project.clientId !==  client.id) {
            return res.status(403).json({ message: 'Unauthorized project access' })
        }

        const feedback = await Feedback.create({
            projectId,
            clientId: client.id,
            message
        });

        res.status(201).json(feedback)
    } catch (error) {
        res.status(500).json({ message: 'Could not submit feedback', error: error.message });
    }
}

const getProjectFeedback = async (req, res) => {
  const { projectId } = req.params;
  const user = req.user;
  const client = req.client;

  try {
    const project = await Project.findOne({ where: { id: projectId } });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isFreelancer = user && project.userId === user.id;
    const isClient = client && project.clientId === client.id;

    if (!isFreelancer && !isClient) {
      return res.status(403).json({ message: 'Unauthorized project access' });
    }

    const feedback = await Feedback.findAll({
      where: { projectId },
      order: [['createdAt', 'DESC']],
      include: [{ model: Client, attributes: ['firstName', 'lastName'] }]
    });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch feedback', error: error.message });
  }
};


module.exports = {
    createFeedback, 
    getProjectFeedback
}