import express from 'express';
import * as wishlistController from '../Controllers/wishlistController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/add', jwtAuth, wishlistController.addToWishlist);
router.post('/remove', jwtAuth, wishlistController.removeFromWishlist);
router.get('/', jwtAuth, wishlistController.getWishlist);
router.delete('/clear', jwtAuth, wishlistController.clearWishlist);

export default router; 