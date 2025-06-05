// middleware/upload.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import path from 'path'; // Import path for getting filename and extension

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName;
    let resourceType = 'image'; // Default
    let finalPublicId;

    const originalFileNameWithoutExt = path.parse(file.originalname).name;
    const originalFileExt = path.extname(file.originalname).toLowerCase(); // e.g., '.pdf', '.jpg'
    const timestamp = Date.now();

    switch (file.fieldname) {
      case 'document':
        folderName = 'documents';
        resourceType = 'raw'; 
        finalPublicId = `${originalFileNameWithoutExt}-${timestamp}${originalFileExt}`;
        break;
      case 'report':
        folderName = 'reports';
        resourceType = 'raw'; // Reports are raw files
        finalPublicId = `${originalFileNameWithoutExt}-${timestamp}${originalFileExt}`;
        break;
      case 'productImage':
        folderName = 'productImages';
        resourceType = 'image'; // Let Cloudinary handle image formats
        // For images, public_id usually doesn't include extension; Cloudinary adds it.
        finalPublicId = `${originalFileNameWithoutExt}-${timestamp}`;
        break;
      default:
        folderName = 'others';
        // For unknown types, decide if raw or auto, and include extension if raw
        resourceType = 'raw'; // Or 'auto'
        finalPublicId = `${originalFileNameWithoutExt}-${timestamp}${originalFileExt || '.bin'}`; // Fallback extension
    }

    const paramsToReturn = {
      folder: folderName,
      public_id: finalPublicId,
      resource_type: resourceType,
    };
    
    // The `format` param is generally used for image conversion or when you want Cloudinary
    // to enforce a format. If public_id for raw files includes the extension,
    // `format` might be redundant for them. For images, Cloudinary's auto-format is often good.
    // if (resourceType === 'image' && (originalFileExt === '.jpg' || originalFileExt === '.png')) {
    //   paramsToReturn.format = originalFileExt.substring(1); // e.g., 'jpg'
    // }

    return paramsToReturn;
  },
});

const upload = multer({ storage: storage });

export default upload;