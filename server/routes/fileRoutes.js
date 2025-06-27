const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const authenticate = require('../middleware/authMiddleware');
const { uploadFile } = require('../controllers/fileController');

router.post('/upload', authenticate, upload.single('file'), uploadFile);

module.exports = router;
