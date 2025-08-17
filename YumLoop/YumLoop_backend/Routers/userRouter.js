import express from 'express';
import * as userController from '../controllers/userController.js';
import { jwtAuth, authorizeRoles } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.post('/google-auth', userController.googleAuth);
router.get('/profile', jwtAuth, userController.getProfile);
router.put('/profile', jwtAuth, upload.single('profilePicture'), userController.updateProfile);
router.put('/change-password', jwtAuth, userController.changePassword);
router.delete('/delete', jwtAuth, userController.deleteUser);
router.post('/follow/:id', jwtAuth, userController.followUser);
router.get('/followers/:id', jwtAuth, userController.getFollowers);
router.get('/following/:id', jwtAuth, userController.getFollowing);
router.get('/search', jwtAuth, userController.searchUsers);
router.put('/block/:id', jwtAuth, authorizeRoles('admin'), userController.blockUser);
router.put('/unblock/:id', jwtAuth, authorizeRoles('admin'), userController.unblockUser);

export default router; 