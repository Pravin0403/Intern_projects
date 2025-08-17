import express from 'express';
import * as productController from '../Controllers/productController.js';
import { jwtAuth, authorizeRoles } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, authorizeRoles('admin'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', jwtAuth, authorizeRoles('admin'), productController.updateProduct);
router.delete('/:id', jwtAuth, authorizeRoles('admin'), productController.deleteProduct);
router.get('/search', productController.searchProducts);
router.post('/review/:id', jwtAuth, productController.addReview);
router.get('/reviews/:id', productController.getReviews);
router.put('/approve/:id', jwtAuth, authorizeRoles('admin'), productController.approveProduct);

export default router; 