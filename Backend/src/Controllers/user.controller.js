import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser } from "../Utils/createUser.js";
import userModel from "../Models/user.model.js";
import blackListModel from "../Models/blackListModel.js";
import postModel from "../Models/post.model.js";

import { uploadToCloudinary } from "../Utils/uploadToCloudinary.js";


/**
 * Register a new user.
 *
 * Endpoint: POST /register
 * Description: Creates a new user account and returns a signed JWT cookie.
 * Access: Public
 *
 * Request body:
 * - {string} userName - Desired username
 * - {string} password - Plain-text password
 * - {string} email - User email (will be lowercased)
 * - {string} [avatar] - Optional avatar URL
 * - {string} [gender] - Optional gender
 * - {string} [bio] - Optional biography
 *
 * Response (201):
 * - {object} user - Created user object (password removed)
 * - {string} token - JWT access token
 *
 * Errors:
 * - 401: User already exists
 * - 400/500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const registerUserController = async (req, res) => {
    try {
        const { userName, password, email, gender, bio } = req.body;
        console.log(req.body)

        // 🔍 Check existing user
        const isAlreadyExist = await userModel.findOne({
            $or: [{ email }, { userName }]
        });

        if (isAlreadyExist) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        let avatarUrl = "";

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            avatarUrl = result.secure_url;
        }

        const user = await createUser({
            userName,
            password,
            email: email.toLowerCase(),
            avatar: avatarUrl,
            gender,
            bio
        });

        // 🔐 Token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 🍪 Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const userObj = user.toObject();
        delete userObj.password;

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: userObj,
            token
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};



/**
 * Login a user.
 *
 * Endpoint: POST /login
 * Description: Authenticates a user by username and password,
 *              sets a JWT cookie and returns the user object.
 * Access: Public
 *
 * Request body:
 * - {string} userName - Username
 * - {string} password - Plain-text password
 *
 * Response (200):
 * - {object} user - Authenticated user (password removed)
 *
 * Errors:
 * - 404: User not found
 * - 401: Password mismatched
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const loginContoller = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await userModel.findOne({ userName }).select('+password')
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: "User don't exist with this email",
                success: false
            })
        }
        const isValidUser = await bcrypt.compare(password, user.password)
        if (!isValidUser) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: "Password mismatched",
                success: false
            })
        }

        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            userName: user.userName
        }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        const userObj = user.toObject()
        delete userObj.password
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            error: null,
            user: userObj
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        })
    }
}


/**
 * Logout a user.
 *
 * Endpoint: POST /logout
 * Description: Invalidates the current JWT by storing it in a blacklist
 *              and clearing the cookie on the client.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request cookies:
 * - {string} token - JWT cookie to blacklist
 *
 * Response (200):
 * - {string} message - Success message
 *
 * Errors:
 * - 404: User not found
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const logoutUserController = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: "No user exist"
            })
        }
        const { token } = req.cookies
        await blackListModel.create({ token })
        res.clearCookie("token");
        return res.status(200).json({
            message: "User logged out successfully",
            success: true,
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        })
    }
}



/**
 * Get the authenticated user's profile and a single post.
 *
 * Endpoint: GET /getProfile
 * Description: Retrieves the profile of the currently authenticated user
 *              and their first post (if any).
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request:
 * - req.user._id populated by `IdentifyUser` middleware
 *
 * Response (200):
 * - {object} user - User object (password removed)
 * - {object} post - One post authored by the user
 *
 * Errors:
 * - 404: No user found
 * - 400: No post found by the user
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getUserProfileController = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                error: "No user exist with the id",
                success: false
            })
        }
        let userPost = await postModel.findOne({ author: user._id })
        if (!userPost) {
            userPost = []
        }
        const userObj = user.toObject()
        delete userObj.password
        return res.status(200).json({
            message: "user profile fetched successfully",
            user: userObj,
            post: userPost
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        })
    }
}



/**
 * Update the authenticated user's profile.
 *
 * Endpoint: PATCH /updateProfile
 * Description: Updates username, email and password for the authenticated user.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request body:
 * - {string} [userName] - New username
 * - {string} [email] - New email (will be lowercased)
 * - {string} [newPassword] - New password to set
 * - {string} [oldPassword] - Current password (required when changing password)
 *
 * Response (200):
 * - {object} user - Updated user object (password removed)
 *
 * Errors:
 * - 404: No user found
 * - 401: Invalid old password
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateUserProfileController = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModel.findById(userId).select('+password')
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                error: "No user exist with the id",
                success: false
            })
        }
        const { userName, email, newPassword, oldPassword, bio, avatar } = req.body
        if (userName) {
            user.userName = userName
        }
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer)
            user.avatar = result.secure_url
        }
        if (email) {
            user.email = email.toLowerCase()
        }
        if (newPassword && oldPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid old password",
                    success: false
                });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword
        }
        if (bio) {
            user.bio = bio
        }
        await user.save()
        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: userObj
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        })
    }
}