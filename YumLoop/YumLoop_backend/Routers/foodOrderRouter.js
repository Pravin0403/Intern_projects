import express from 'express';
import * as foodOrderController from '../Controllers/foodOrderController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, foodOrderController.placeOrder);
router.get('/:id', jwtAuth, foodOrderController.getOrder);
router.get('/', jwtAuth, foodOrderController.getOrders);
router.get('/restaurant/:restaurantId', jwtAuth, foodOrderController.getOrdersByRestaurant);
router.put('/:id/status', jwtAuth, foodOrderController.updateOrderStatus);
router.put('/:id/cancel', jwtAuth, foodOrderController.cancelOrder);
router.get('/:id/track', jwtAuth, foodOrderController.trackOrder);

export default router; 