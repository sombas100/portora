const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'project-files',
    allowed_formats: ['jpg', 'png', 'pdf', 'docx', 'xlsx', 'zip'],
  },
});

const upload = multer({ storage });

module.exports = upload;
