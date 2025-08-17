import express from 'express';
import * as addressController from '../Controllers/addressController.js';
import { jwtAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, addressController.addAddress);
router.get('/', jwtAuth, addressController.getAddresses);
router.put('/:id', jwtAuth, addressController.updateAddress);
router.delete('/:id', jwtAuth, addressController.removeAddress);

export default router; 