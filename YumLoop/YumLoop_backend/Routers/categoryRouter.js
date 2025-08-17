import express from 'express';
import * as categoryController from '../Controllers/categoryController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.put('/:id', jwtAuth, categoryController.updateCategory);
router.delete('/:id', jwtAuth, categoryController.deleteCategory);

export default router; 