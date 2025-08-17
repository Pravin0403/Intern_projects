import express from 'express';
import * as storyController from '../controllers/storyController.js';
import { jwtAuth } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';
const router = express.Router();

router.post('/', jwtAuth, storyController.addStory);
router.get('/', jwtAuth, storyController.getStories);
router.get('/user/:id', jwtAuth, storyController.getStoriesByUser);
router.delete('/:id', jwtAuth, storyController.deleteStory);

export default router; 