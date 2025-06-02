import express from 'express';
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile
} from '../controllers/profileController.js';
import upload from '../middleware/profileUploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('profileImage'), createProfile);
router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.put('/:id', upload.single('profileImage'), updateProfile);
router.delete('/:id', deleteProfile);

export default router;