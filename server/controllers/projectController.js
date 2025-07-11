const { Project, Client } = require('../database/models');

const getAllProjects = async (req, res) => {
    const userId = req.user.id;
    try {
        const projects = await Project.findAll({ where: { userId} });
        if (projects.length === 0) return res.status(404).json({ message: 'No projects found'})
        
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
}

const getClientProject = async (req, res) => {
    const client = req.client;

    try {
        const projects = await Project.findAll({ where: { clientId: client.id }})
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching client projects', error: error.message });
    }
}

const getProjectById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const project = await Project.findOne({ where: { id, userId } })
        if (!project) return res.status(404).json({ message: 'Project not found' });
    
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error: error.message });
    }
}

const createProject = async (req, res) => {
    const { title, description, status, dueDate, clientId } = req.body;
    const userId = req.user.id;

    try {
        const client = await Client.findOne({ where: { id: clientId, userId } });
        if (!client) return res.status(404).json({ message: 'Client not found' })
        const project = await Project.create({ 
            title, 
            description, 
            status, 
            dueDate, 
            clientId, 
            userId 
        });
        
        res.status(201).json(project)
    } catch (error) {
        res.status(500).json({ message: 'Could not create project', error: error.message });
    }
}

const updateProjectStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    try {
        const project = await Project.findOne({ where: { id, userId } });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        const validStatuses = ['In Progress', 'Completed', 'Pending'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid project status' });
        }

        project.status = status;
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project status', error: error.message });
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const project = await Project.findOne({ where: { id, userId }})
        if (!project) return res.status(404).json({ message: 'Project not found' });

        await project.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project', error: error.message });
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    getClientProject,
    createProject,
    updateProjectStatus,
    deleteProject,
}