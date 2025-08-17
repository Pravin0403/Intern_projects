import express from 'express';
import * as restaurantController from '../Controllers/restaurantController.js';
import { jwtAuth, authorizeRoles } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, restaurantController.createRestaurant);
router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.put('/:id', jwtAuth, restaurantController.updateRestaurant);
router.delete('/:id', jwtAuth, restaurantController.deleteRestaurant);
router.get('/search', restaurantController.searchRestaurants);
router.get('/owner', jwtAuth, restaurantController.getRestaurantsByOwner);
router.post('/review/:id', jwtAuth, restaurantController.addReview);
router.get('/reviews/:id', restaurantController.getReviews);
router.put('/approve/:id', jwtAuth, authorizeRoles('admin'), restaurantController.approveRestaurant);

export default router; 