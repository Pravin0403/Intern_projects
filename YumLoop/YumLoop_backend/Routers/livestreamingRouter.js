import express from 'express';
import * as livestreamingController from '../Controllers/livestreamingController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/start', jwtAuth, livestreamingController.startStream);
router.post('/stop', jwtAuth, livestreamingController.stopStream);
router.get('/', jwtAuth, livestreamingController.getStreams);

export default router; 