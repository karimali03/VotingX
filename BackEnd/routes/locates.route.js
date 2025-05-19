import express from 'express';
import LocateController from '../controllers/locate.controller.js';

const router = express.Router();

// Link user with district
router.post('/link', LocateController.linkUserLocation);

// Get user-district link
router.get('/link/:userId/:districtId', LocateController.getUserLocationLink);

// Update user-district link
router.put('/link/:userId/:oldDistrictId', LocateController.updateUserLocationLink);

// Remove user-district link
router.delete('/link/:userId/:districtId', LocateController.deleteUserLocationLink);

export default router;