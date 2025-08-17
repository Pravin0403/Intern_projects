import express from 'express';
import * as foodReviewController from '../Controllers/foodReviewController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, foodReviewController.addReview);
router.get('/restaurant/:id', foodReviewController.getReviews);
router.get('/user/:id', foodReviewController.getReviewsByUser);
router.put('/:id', jwtAuth, foodReviewController.editReview);
router.delete('/:id', jwtAuth, foodReviewController.deleteReview);

export default router; 