const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById, createProject, updateProjectStatus } = require('../controllers/projectController');
const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllProjects);
router.get('/:id', authenticate, getProjectById);
router.post('/create', authenticate, createProject);
router.put('/:id', authenticate, updateProjectStatus);

module.exports = router;