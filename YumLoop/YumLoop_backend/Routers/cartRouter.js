import express from 'express';
import * as cartController from '../Controllers/cartController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/add', jwtAuth, cartController.addToCart);
router.post('/remove', jwtAuth, cartController.removeFromCart);
router.put('/update', jwtAuth, cartController.updateCart);
router.get('/', jwtAuth, cartController.getCart);
router.delete('/clear', jwtAuth, cartController.clearCart);

export default router; 