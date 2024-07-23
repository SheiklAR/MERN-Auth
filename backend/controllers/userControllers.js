import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";



// @desc   Auth user/get token
// @route  POST /api/users/auth
// @access PUBLIC
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Inavalid email or password');
    }

});

// @desc   register a new user
// @route  POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error(`User already exists`)
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Inavalid user data');
    }

});

// @desc   log out user/clear cookie
// @route  POST /api/users/logout
// @access PUBLIC
const logOutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'User logged out' });
});


// @desc   getUserProfile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req, res) => {
    if (req.user) {
        res.json({
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
        });
      } else {
        res.status(404);
        throw new Error('User not found');
      }
});


// @desc   update user profile
// @route  PUT /api/users/profile
// @access PUBLIC
const updateUserProfile = asyncHandler(async (req, res) => {
    const updateUserProfile = asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
      
        if (user) {
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
      
          if (req.body.password) {
            user.password = req.body.password;
          }
      
          const updatedUser = await user.save();
      
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
          });
        } else {
          res.status(404);
          throw new Error('User not found');
        }
      });
});

export {
    authUser,
    registerUser,
    logOutUser,
    getUserProfile,
    updateUserProfile,
 };