const { File, Project } = require('../database/models');

const uploadFile = async (req, res) => {
  const { projectId } = req.body;
  const user = req.user;
  const client = req.client;

  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const project = await Project.findOne({ where: { id: projectId } });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    const isFreelancer = user && project.userId === user.id;
    const isClient = client && project.clientId === client.id;

    if (!isFreelancer && !isClient) {
      return res.status(403).json({ message: 'Not authorized to upload to this project' });
    }

    const uploader = isFreelancer ? 'Freelancer' : 'Client';

    const newFile = await File.create({
      projectId,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      uploader
    });

    res.status(201).json({ file: newFile, uploadedBy: uploader });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

const getFilesByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const files = await File.findAll({ where: { projectId } });

    if (!files.length) {
      return res.status(404).json({ message: "No files found for this project" });
    }

    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files", error: err.message });
  }
};

module.exports = { uploadFile, getFilesByProjectId };
