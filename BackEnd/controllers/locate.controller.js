import Locate from '../models/locates.model.js';
import User from '../models/user.model.js';
import District from '../models/districts.model.js';
import asyncFun from '../middlewares/async.function.js';

class LocateController {
    // Link user with location
    static linkUserLocation = asyncFun(async (req, res) => {
        const { userId, districtId, nationalId } = req.body;

        // Validate required fields
        if (!userId || !districtId || !nationalId) {
            return res.status(400).send({
                message: "userId, districtId, and nationalId are required",
                data: null
            });
        }

        // Check if user exists
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                data: null
            });
        }

        // Check if district exists
        const district = await District.getDistrictById(districtId);
        if (!district) {
            return res.status(404).send({
                message: "District not found",
                data: null
            });
        }

        // Check if user is already linked to this district
        const existingLocation = await Locate.getLocateById(userId, districtId);
        if (existingLocation) {
            return res.status(400).send({
                message: "User is already linked to this district",
                data: null
            });
        }

        // Create new location link
        await Locate.createLocate(userId, districtId, nationalId);

        // Get the created location link
        const newLocation = await Locate.getLocateById(userId, districtId);

        res.status(201).send({
            message: "User linked to district successfully",
            data: newLocation
        });
    });

    // Update user location link
    static updateUserLocationLink = asyncFun(async (req, res) => {
        const { userId, oldDistrictId } = req.params;
        const { newDistrictId, nationalId } = req.body;

        // Validate required fields
        if (!newDistrictId || !nationalId) {
            return res.status(400).send({
                message: "newDistrictId and nationalId are required",
                data: null
            });
        }

        // Check if user exists
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                data: null
            });
        }

        // Check if new district exists
        const newDistrict = await District.getDistrictById(newDistrictId);
        if (!newDistrict) {
            return res.status(404).send({
                message: "New district not found",
                data: null
            });
        }

        // Check if old location link exists
        const existingLocation = await Locate.getLocateById(userId, oldDistrictId);
        if (!existingLocation) {
            return res.status(404).send({
                message: "User is not linked to the specified district",
                data: null
            });
        }

        // Check if user is already linked to the new district
        const existingNewLocation = await Locate.getLocateById(userId, newDistrictId);
        if (existingNewLocation) {
            return res.status(400).send({
                message: "User is already linked to the new district",
                data: null
            });
        }

        // Delete old location link
        await Locate.deleteLocate(userId, oldDistrictId);

        // Create new location link
        await Locate.createLocate(userId, newDistrictId, nationalId);

        // Get the updated location link
        const updatedLocation = await Locate.getLocateById(userId, newDistrictId);

        res.status(200).send({
            message: "User district link updated successfully",
            data: updatedLocation
        });
    });

    // Get user location link
    static getUserLocationLink = asyncFun(async (req, res) => {
        const { userId, districtId } = req.params;

        const location = await Locate.getLocateById(userId, districtId);
        if (!location) {
            return res.status(404).send({
                message: "User is not linked to this district",
                data: null
            });
        }

        // Get district details
        const district = await District.getDistrictById(districtId);

        res.status(200).send({
            message: "User district link retrieved successfully",
            data: {
                ...location,
                district
            }
        });
    });

    // Delete user location link
    static deleteUserLocationLink = asyncFun(async (req, res) => {
        const { userId, districtId } = req.params;

        // Check if location link exists
        const location = await Locate.getLocateById(userId, districtId);
        if (!location) {
            return res.status(404).send({
                message: "User is not linked to this district",
                data: null
            });
        }

        await Locate.deleteLocate(userId, districtId);

        res.status(200).send({
            message: "User district link removed successfully",
            data: location
        });
    });
}

export default LocateController; 