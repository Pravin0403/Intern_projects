import express from 'express';
import * as messageController from '../Controllers/messageController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/send', jwtAuth, messageController.sendMessage);
router.get('/conversation/:userId', jwtAuth, messageController.getMessages);
router.get('/conversations', jwtAuth, messageController.getConversations);
router.delete('/:id', jwtAuth, messageController.deleteMessage);
router.put('/read', jwtAuth, messageController.markAsRead);
router.post('/block/:id', jwtAuth, messageController.blockUser);

export default router; 