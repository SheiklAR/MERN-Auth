//userRoutes.js

import express from 'express';
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
router.route('/profile').get(getUserProfile).put(updateUserProfile);


export default router;

