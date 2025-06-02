import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'products',
      resource_type: file.mimetype.startsWith('application/pdf') ? 'raw' : 'image',
    };
  },
});

const upload = multer({ storage });

export default upload;
