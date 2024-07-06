import asyncHandler from "express-async-handler";

// @desc   Auth user/get token
// @route  POST /api/users/auth
// @access PUBLIC
const authUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Auth User' });
});

// @desc   register a new user
// @route  POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Register user' });
});

// @desc   log out user/clear cookie
// @route  POST /api/users/logout
// @access PUBLIC
const logOutUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'logOut User' });
});


// @desc   getUserProfile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'user profile' });
});


// @desc   update user profile
// @route  PUT /api/users/profile
// @access PUBLIC
const updateUserProfile = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Auth User' });
});

export {
    authUser,
    registerUser,
    logOutUser,
    getUserProfile,
    updateUserProfile,
 };