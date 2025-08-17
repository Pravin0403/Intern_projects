import express from 'express';
import * as paymentController from '../Controllers/paymentController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/initiate', jwtAuth, paymentController.initiatePayment);
router.post('/verify', jwtAuth, paymentController.verifyPayment);
router.get('/', jwtAuth, paymentController.getPayments);
router.get('/order/:orderId', jwtAuth, paymentController.getPaymentsByOrder);
router.post('/refund/:id', jwtAuth, paymentController.refundPayment);

export default router; 