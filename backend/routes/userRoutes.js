//userRoutes.js

import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
    authUser,
    registerUser,
    logOutUser,
    getUserProfile,
    updateUserProfile,
} from '../controllers/userControllers.js';

const router = express.Router(); 


router.route('/').post(registerUser);
router.route('/auth').post(authUser);
router.route('/logout').post(logOutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);


export default router;

