const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById, getClientProject, createProject, updateProjectStatus, deleteProject } = require('../controllers/projectController');
const authenticate = require('../middleware/authMiddleware');
const clientAuthenticate = require('../middleware/clientAuthMiddleware')

router.get('/', authenticate, getAllProjects);
router.get('/client', clientAuthenticate, getClientProject);
router.get('/:id', authenticate, getProjectById);
router.post('/create', authenticate, createProject);
router.put('/:id', authenticate, updateProjectStatus);
router.delete('/:id', authenticate, deleteProject)

module.exports = router;