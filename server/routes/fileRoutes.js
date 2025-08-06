const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const authenticate = require('../middleware/authMiddleware');
const { uploadFile, getFilesByProjectId } = require('../controllers/fileController');
const clientAuthenticate = require('../middleware/clientAuthMiddleware');

router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.post('/client/upload', clientAuthenticate, upload.single('file'), uploadFile);
router.get('/project/:projectId', authenticate, getFilesByProjectId);

module.exports = router;
