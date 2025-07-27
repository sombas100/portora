const { Client, Project, User } = require("../database/models");

const planLimits = {
  free: 1,
  starter: 3,
  pro: 5,
  enterprise: 10,
};

const summary = async (req, res) => {
    const userId = req.user.id;
    const plan = req.user.plan || "free";
    const subscriptionStatus = req.user.subscriptionStatus || "inactive";

  try {
    const [clients, projects] = await Promise.all([
      Client.count({ where: { userId } }),
      Project.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
        limit: 5,
      }),
    ]);

    const upcoming = await Project.findAll({
      where: {
        userId,
        dueDate: { [require("sequelize").Op.gt]: new Date() },
      },
      order: [["dueDate", "ASC"]],
      limit: 3,
    });

    const maxClients = planLimits[plan] ?? 0;
    const remaining = Math.max(maxClients - clients, 0);

    res.json({
      plan,
      subscriptionStatus,
      clients: { used: clients, limit: maxClients, remaining },
      recentProjects: projects,
      upcomingDeadlines: upcoming,
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ message: "Failed to load dashboard", error: err.message });
  }
}

const getProjectActivity = async (req, res) => {
  const userId = req.user.id;
  const days = 14;
  const fromDate = subDays(new Date(), days);

  try {
    const projects = await Project.findAll({
      where: {
        userId,
        createdAt: { [Op.gte]: fromDate }
      },
      order: [['createdAt', 'ASC']]
    });

    const counts = Array(days).fill(0);
    const labels = Array(days).fill(null).map((_, i) =>
      format(subDays(new Date(), days - i - 1), 'MMM d')
    );

    projects.forEach(project => {
      const index = days - 1 - Math.floor((new Date() - new Date(project.createdAt)) / (1000 * 60 * 60 * 24));
      if (counts[index] !== undefined) counts[index]++;
    });

    res.json({ labels, counts });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch project activity', error: err.message });
  }
};

const getClientDistribution = async (req, res) => {
  const userId = req.user.id;

  try {
    const clients = await Client.findAll({ where: { userId } });
    const statusMap = clients.reduce((acc, client) => {
      const status = client.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    res.json({ statusMap });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch client distribution', error: err.message });
  }
};

module.exports = { summary,getClientDistribution, getProjectActivity  }