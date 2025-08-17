import express from 'express';
import * as ecomOrderController from '../Controllers/ecomOrderController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, ecomOrderController.placeOrder);
router.get('/:id', jwtAuth, ecomOrderController.getOrder);
router.get('/', jwtAuth, ecomOrderController.getOrders);
router.put('/:id/status', jwtAuth, ecomOrderController.updateOrderStatus);
router.put('/:id/cancel', jwtAuth, ecomOrderController.cancelOrder);

export default router; 