import express from 'express';
import * as reelController from '../controllers/reelController.js';
import { jwtAuth } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';
const router = express.Router();

router.post('/', jwtAuth, reelController.addReel);
router.get('/', jwtAuth, reelController.getReels);
router.get('/user/:id', jwtAuth, reelController.getReelsByUser);
router.put('/like/:id', jwtAuth, reelController.likeReel);
router.post('/comment/:id', jwtAuth, reelController.commentReel);
router.delete('/:id', jwtAuth, reelController.deleteReel);
router.post('/report/:id', jwtAuth, reelController.reportReel);

export default router; 