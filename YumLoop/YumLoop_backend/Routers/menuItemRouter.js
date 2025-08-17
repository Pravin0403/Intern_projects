import express from 'express';
import * as menuItemController from '../Controllers/menuItemController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, menuItemController.createMenuItem);
router.get('/', menuItemController.getMenuItems);
router.get('/restaurant/:restaurantId', menuItemController.getMenuItemsByRestaurant);
router.put('/:id', jwtAuth, menuItemController.updateMenuItem);
router.delete('/:id', jwtAuth, menuItemController.deleteMenuItem);
router.get('/search', menuItemController.searchMenuItems);

export default router; 