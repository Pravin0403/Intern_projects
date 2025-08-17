import express from 'express';
import * as productReviewController from '../Controllers/productReviewController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, productReviewController.addReview);
router.get('/product/:id', productReviewController.getReviews);
router.get('/user/:id', productReviewController.getReviewsByUser);
router.put('/:id', jwtAuth, productReviewController.editReview);
router.delete('/:id', jwtAuth, productReviewController.deleteReview);

export default router; 