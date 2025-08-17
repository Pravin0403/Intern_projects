import express from 'express';
import * as deliveryPartnerController from '../Controllers/deliveryPartnerController.js';
import { jwtAuth, authorizeRoles } from '../middleware/auth.js';
const router = express.Router();

router.post('/', jwtAuth, authorizeRoles('admin'), deliveryPartnerController.addPartner);
router.get('/', jwtAuth, authorizeRoles('admin'), deliveryPartnerController.getPartners);
router.put('/:id', jwtAuth, authorizeRoles('admin'), deliveryPartnerController.updatePartner);
router.post('/assign/:id', jwtAuth, authorizeRoles('admin'), deliveryPartnerController.assignOrder);
router.get('/orders/:id', jwtAuth, deliveryPartnerController.getOrdersForPartner);

export default router; 